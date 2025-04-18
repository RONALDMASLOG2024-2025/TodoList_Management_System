import React from "react";

export default function Task({ task }) {
  const formattedDate = new Date(task.datetime).toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // optional: makes it AM/PM format
  });

  const taskDate = new Date(task.datetime);
  const now = new Date();

  // Overdue if task time has passed current time
  const isOverdue = taskDate < now;
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
            {task.task}
          </label>
          <p
            className={`text-xs mt-1 ${
              isOverdue ? "text-red-400" : "text-gray-300"
            }`}
          >
            {formattedDate}
          </p>
        </div>
      </div>
    </>
  );
}
