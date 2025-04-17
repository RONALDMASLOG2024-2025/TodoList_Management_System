import React from "react";

export default function Todo() {
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen font-sans">
      {/* Sidebar - Tasks */}
      <section className="w-full md:w-4/12 bg-[#41444B] p-6 text-white overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">My To-dos</h2>

        {/* Overdue */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">OVERDUE</h3>
          <div className="bg-[#52575D] p-4 rounded-lg mb-3">TASK 1 MONGO</div>
          <div className="bg-[#52575D] p-4 rounded-lg">TASK 2 MONGO</div>
        </div>

        {/* Today */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">TODAY</h3>
          <div className="bg-[#52575D] p-4 rounded-lg mb-3">TASK 3 MONGO</div>
        </div>

        {/* You can add LATER, COMPLETED sections too */}

        {/* LATER */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">LATER</h3>
          <div className="bg-[#52575D] p-4 rounded-lg mb-3">TASK 5 MONGO</div>
        </div>

        {/* COMPLETED */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">
            COMPLETED
          </h3>
          <div className="bg-[#52575D] p-4 rounded-lg mb-3">TASK 4 MONGO</div>
        </div>
      </section>

      {/* Task Details */}
      <section className="relative w-full md:w-8/12 bg-[#CABFAB] p-6 text-[#141414]">
        <div className="bg-[#DFD8C8] p-4 rounded-lg mb-4 shadow-md">
          <h3 className="font-semibold text-lg">TASK 1 MONGO</h3>
        </div>

        <div className="bg-[#DFD8C8] p-4 rounded-lg mb-4 shadow-md flex items-center gap-2">
          <span role="img" aria-label="calendar">
            📅
          </span>
          <span>18 APR, 7:00 AM</span>
        </div>

        <div className="bg-[#DFD8C8] p-4 rounded-lg shadow-md">
          <span role="img" aria-label="notes">
            📓
          </span>{" "}
          Notes
        </div>
      </section>
    </div>
  );
}
