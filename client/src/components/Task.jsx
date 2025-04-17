import React from "react";

export default function Task() {
  return (
    <>
      <div className="bg-[#485060] p-4 rounded-xl flex items-center shadow-md hover:bg-[#525a6b] transition-colors duration-200 mb-3">
        {/* Circular checkbox */}
        <input
          type="checkbox"
          id="task1"
          name="task1"
          className="w-5 h-5 rounded-full accent-amber-400 border-2 border-gray-300"
        />

        {/* Task content */}
        <div className="flex flex-col flex-2 text-center">
          <label
            htmlFor="task1"
            className="text-amber-200 text-sm font-semibold cursor-pointer"
          >
            TASK 1 MONGO
          </label>
          <p className="text-xs text-gray-300 mt-1">April 18, 7:00 AM</p>
        </div>
      </div>
    </>
  );
}
