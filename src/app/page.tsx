"use client";

import { useRef } from "react";

export default function Home() {
  const touches = [1, 2, 3, 4, 5, 6, 7, 8, 9, `+/-`, 0, `.`];
  const operators = [`+`, `-`, `*`, `/`, `=`];
  const outputRef = useRef<HTMLTextAreaElement>(null);

  const updateInput = (value: string | number) => {
    if (outputRef.current) {
      if (value === "+/-") {
        const currentValue = outputRef.current.value;
        if (currentValue.startsWith("-")) {
          outputRef.current.value = currentValue.slice(1);
        } else {
          outputRef.current.value = "-" + currentValue;
        }
        return;
      }
      outputRef.current.value += value;
    }
  };
  const calculate = () => {
    if (outputRef.current) {
      if (outputRef.current.value.trim() === "") {
        showAlert("Error: Empty Expression");
        return;
      }
      try {
        const result = eval(outputRef.current.value);
        outputRef.current.value = result;
      } catch (error) {
        showAlert("Error: Invalid Expression");
      }
    }
  };
  const deleteLast = () => {
    if (outputRef.current) {
      outputRef.current!.value = outputRef.current!.value.slice(0, -1);
      if (outputRef.current!.value === "") {
        outputRef.current!.placeholder = "";
      }
    }
  };
  const deleteAll = () => {
    if (outputRef.current) {
      outputRef.current.value = "";
      outputRef.current.placeholder = "";
    }
  };
  const showAlert = (alert: string) => {
    if (outputRef.current) {
      outputRef.current.value = "";
      outputRef.current.placeholder = alert;
    }
  };
  return (
    <div className="flex h-lvh items-center justify-center flex-col overflow-hidden dark:bg-black dark:text-white">
      <div className="width-constrained h-[90%] border flex flex-col items-center">
        <div className="flex-1 p-2 w-full">
          {/* visible output */}
          <textarea
            ref={outputRef}
            disabled
            name="output"
            id="output"
            className="w-full h-full bg-white/10 p-2 rounded resize-none border border-gray-300 dark:bg-black dark:border-gray-600"
            defaultValue={``}
            placeholder="Try me !"
          ></textarea>
        </div>
        {/* buttons */}
        <div className="w-full flex-2 p-3 flex items-center border-t border-gray-300 dark:border-gray-600">
          <div className="h-full flex-3 grid grid-cols-3 gap-2 p-2">
            <button onClick={() => deleteLast()} className="circle-button-red">
              {`<x`}
            </button>
            <button onClick={() => deleteAll()} className="circle-button-red">
              {`C`}
            </button>
            <button
              onClick={() => updateInput(`%`)}
              className="circle-button-red"
            >
              {`%`}
            </button>
            {touches.map((touch) => (
              <button
                key={touch}
                onClick={() => updateInput(touch)}
                className="circle-button-white"
              >
                {touch}
              </button>
            ))}
          </div>
          <div className="h-full flex-1 grid grid-cols-1 gap-2 p-2">
            {operators.map((operator) => (
              <button
                key={operator}
                onClick={
                  operator == `=`
                    ? () => calculate()
                    : () => updateInput(operator)
                }
                className="circle-button-blue"
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
