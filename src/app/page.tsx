"use client";

import { useRef } from "react";

export default function Home() {
  const refResult = useRef<HTMLTextAreaElement>(null);
  const addPerformanceEntry = async (formData: FormData) => {
    const entry = formData.get("entry");
    console.log("New performance entry:", entry);
    refResult.current!.value += `${entry}\n`;
  };

  return (
    <div className="flex h-full items-center justify-between flex-col overflow-hidden">
      <h1 className="flex text-4xl font-bold w-full text-center mt-6 underline justify-center">
        Performance Tracker
      </h1>
      <div className="flex-1 width-constrained border relative rounded-lg shadow-lg border-gray-300 p-2 ">
        <textarea
          ref={refResult}
          disabled
          className="resize-none w-full h-32 p-2 border border-gray-300 rounded-lg"
          value={``}
        />
        <form action={addPerformanceEntry} className="flex flex-col gap-4">
          <input
            type="text"
            name="entry"
            id="entry"
            className="border w-full"
          />
          <input type="submit" value="Submit" className="border bg-blue-400" />
        </form>
      </div>
    </div>
  );
}
