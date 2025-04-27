"use client";
import { SearchIcon } from "lucide-react";
import Form from "next/form";
import { useState } from "react";

const NextFormButton = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Form action={`/?q=${searchTerm}`}>
        <input
          name="q"
          className="border border-lime-200 my-2 focus:outline-lime-400 focus:border-none outline-none py-2 px-3 rounded-md"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-8 rounded-3xl border-none hover:bg-blue-700 text-xl md:text-2xl font-semibold flex items-center gap-x-4"
        >
          <SearchIcon size={26} />
          <span>Search</span>
        </button>
      </Form>
    </div>
  );
};

export default NextFormButton;
