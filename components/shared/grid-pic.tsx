import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Image from "next/image";

export function BentoGridDemo() {
  return (
    <BentoGrid className="w-[90%] my-8 mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          header={item.header}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const items = [
  {
    header: (
      <Image
        src="/assets/img-5.jpg"
        alt="img"
        className="h-full w-full rounded-lg "
        width={500}
        height={500}
      />
    ),
  },
  {
    header: (
      <Image
        src="/assets/img-2.jpg"
        alt="img"
        className="h-full w-full rounded-lg "
        width={500}
        height={500}
      />
    ),
  },
  {
    header: (
      <Image
        src="/assets/img-3.jpg"
        alt="img"
        className="h-full w-full rounded-lg "
        width={500}
        height={500}
      />
    ),
  },
  {
    header: (
      <Image
        src="/assets/img-1.jpg"
        alt="img"
        className="h-full w-full object-cover rounded-lg "
        width={1200}
        height={900}
      />
    ),
  },
  {
    header: (
      <Image
        src="/assets/img-4.jpg"
        alt="img"
        className="h-full  rounded-lg object-cover "
        width={800}
        height={900}
      />
    ),
  },
];
