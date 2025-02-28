import {
  AutoModel,
  AutoProcessor,
  env,
  PreTrainedModel,
  Processor,
  RawImage,
} from "@huggingface/transformers";
import { AsyncCallbackSet } from "next/dist/server/lib/async-callback-set";
import { config } from "process";

const WEBGPU_MODEL_ID = "Xenova/modnet";
const FALLBACK_MODEL_ID = "briaai/RMBG-1.4";

interface ModelState {
  model: PreTrainedModel | null;
  processor: Processor | null;
  isWebGPUSupported: boolean;
  currentModelId: string;
}

interface ModelInfo {
  currentModelId: string;
  isWebGPUSupported: boolean;
}

const state: ModelState = {
  model: null,
  processor: null,
  isWebGPUSupported: false,
  currentModelId: FALLBACK_MODEL_ID,
};

const inializeWebGPU = async () => {
  const gpu = (navigator as any).gpu;

  if (!gpu) return false;

  try {
    const adapter = await gpu.requestAdapter();
    if (!adapter) return false;

    env.allowLocalModels = false;

    if (env.backends?.onnx.wasm) {
      env.backends.onnx.wasm.proxy = false;
    }

    await new Promise((resolve) => setTimeout(resolve, 200));

    state.model = await AutoModel.from_pretrained(WEBGPU_MODEL_ID, {
      device: "webgpu",
      config: {
        model_type: "modnet",
        architectures: ["MODNet"],
      },
    });

    state.processor = await AutoProcessor.from_pretrained(WEBGPU_MODEL_ID, {});

    state.isWebGPUSupported = true;
    return true;
  } catch (error) {
    console.error("webgpu error", error);
    return false;
  }
};

export const initializeModel = async (
  forceModelId?: string
): Promise<boolean> => {
  try {
    const selectedModelId = forceModelId || FALLBACK_MODEL_ID;

    if (selectedModelId === WEBGPU_MODEL_ID) {
      const webGPUSuccess = await inializeWebGPU();
      if (webGPUSuccess) {
        state.currentModelId = WEBGPU_MODEL_ID;
        return true;
      }
    }

    env.allowLocalModels = false;
    if (env.backends?.onnx.wasm) {
      env.backends.onnx.wasm.proxy = true;
    }

    state.model = await AutoModel.from_pretrained(FALLBACK_MODEL_ID, {
      progress_callback: (progress: any) => {
        console.log(`loading model: ${Math.round(progress * 100)}%`);
      },
    });

    state.processor = await AutoProcessor.from_pretrained(FALLBACK_MODEL_ID, {
      revision: "main",
      config: {
        do_normalize: true,
        do_pad: true,
        do_resize: true,
        do_rescale: true,
        image_mean: [0.5, 0.5, 0.5],
        feature_extractor_type: "ImageFeatureExtractor",
        image_std: [0.5, 0.5, 0.5],
        resample: 2,
        rescale_factor: 0.00392156862745098,
        size: { width: 1024, height: 1024 },
      },
    });

    state.currentModelId = FALLBACK_MODEL_ID;
    if (!state.model || !state.processor) {
      throw new Error("Model or processor not found");
    }

    state.currentModelId = selectedModelId;
    return true;
  } catch (error) {
    console.error("Error initializing model:", error);
    if (forceModelId === WEBGPU_MODEL_ID) {
      console.log("Falling back to cross-browser model...");
      return initializeModel(FALLBACK_MODEL_ID);
    }
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to initialize background removal model"
    );
  }
};

export const getModelInfo = (): ModelInfo => {
  return {
    currentModelId: state.currentModelId,
    isWebGPUSupported: Boolean((navigator as any).gpu),
  };
};

export const processImage = async (image: File): Promise<File> => {
  if (!state.model || !state.processor) {
    throw new Error("Model or processor not found");
  }

  const img = await RawImage.fromURL(URL.createObjectURL(image));

  try {
    const { pixel_values } = await state.processor(img);

    const { output } = await state.model({ input: pixel_values });

    const maskData = (
      await RawImage.fromTensor(output[0].mul(255).to("uint8")).resize(
        img.width,
        img.height
      )
    ).data;

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");

    //  Draw the orinal img

    ctx.drawImage(img.toCanvas(), 0, 0);

    const pixelData = ctx.getImageData(0, 0, img.width, img.height);

    for (let i = 0; i < maskData.length; i++) {
      pixelData.data[4 * i + 3] = maskData[i];
    }
    ctx.putImageData(pixelData, 0, 0);

    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (blob) =>
          blob ? resolve(blob) : reject(new Error("Failed to create blob")),
        "image/png"
      )
    );

    const [fileName] = image.name.split(".");
    const processedFile = new File([blob], `${fileName}-bg-blasted.png`, {
      type: "image/png",
    });
    return processedFile;
  } catch (error) {
    console.error("Error processing image:", error);
    throw new Error("Failed to process image");
  }
};
