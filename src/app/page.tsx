"use client";
import { Calculatrice } from "@/logic/calculatrice";
import { operators, touches } from "@/logic/constantes";
import { useRef, useState } from "react";

export default function Home() {
  const [output, setOutput] = useState<string>("0");
  const [lastOperator, setLastOperator] = useState<string | null>(null);
  const calculatrice = useRef(new Calculatrice(setOutput, setLastOperator));

  return (
    <div className="flex h-dvh items-center justify-center flex-col overflow-hidden dark:bg-black dark:text-white">
      <div className="width-constrained h-[90%] border flex flex-col items-center rounded-lg bg-white/5 dark:bg-black/5 border-gray-300 dark:border-gray-600">
        <div className="flex-1 p-2 w-full">
          {/* visible output */}
          <textarea
            disabled
            name="output"
            id="output"
            className="w-full h-full bg-white/10 p-2 rounded resize-none border border-gray-300 dark:bg-black dark:border-gray-600"
            value={output}
          />
        </div>
        {/* buttons */}
        <div className="w-full flex-2 p-3 flex items-center border-t border-gray-300 dark:border-gray-600">
          <div className="h-full flex-3 grid grid-cols-3 gap-2 p-2">
            <button
              onClick={() => calculatrice.current.deleteLast()}
              className="circle-button-red"
            >
              {`<x`}
            </button>
            <button
              onClick={() => calculatrice.current.deleteAll()}
              className="circle-button-red"
            >
              {`C`}
            </button>
            <button
              onClick={() => calculatrice.current.updateInput(`%`)}
              className={` ${
                lastOperator === `%`
                  ? "circle-button-last"
                  : "circle-button-blue"
              }`}
            >
              {`mod`}
            </button>
            {touches.map((touch) => (
              <button
                key={touch}
                onClick={() => calculatrice.current.updateInput(touch)}
                className="circle-button-white"
              >
                {touch}
              </button>
            ))}
          </div>
          <div className="h-full flex-1 grid grid-cols-1 gap-2 p-2">
            {operators
              .filter((operator) => operator !== `%`)
              .map((operator) => (
                <button
                  key={operator}
                  onClick={
                    operator === `=`
                      ? () => calculatrice.current.calculate()
                      : () => calculatrice.current.updateInput(operator)
                  }
                  className={` ${
                    lastOperator === operator
                      ? "circle-button-last"
                      : "circle-button-blue"
                  }`}
                >
                  {operator}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
