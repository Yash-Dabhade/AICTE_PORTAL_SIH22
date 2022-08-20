import React from "react";

export default function ListCard({ name, field, btnFunc }) {
  return (
    <div className="p-2">
      <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
        <div className="flex items-center mb-3">
          <h2 className="text-gray-900 text-lg title-font font-medium">
            {name}
          </h2>
        </div>
        <div className="flex-grow">
          {field && (
            <p className="leading-relaxed text-base">Field : {field}</p>
          )}
          <button
            onClick={() => btnFunc(name)}
            className="bg-transparent hover:bg-red-500 text-red-500 mt-3 inline-flex items-center font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
