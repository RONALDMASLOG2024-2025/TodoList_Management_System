import React from "react";

export default function Todo() {
  return (
    <div className="flex h-screen w-screen font-sans">
      {/* Tasks Sidebar (4/12) */}
      <section className="w-4/12 bg-[#41444B] p-6 text-white overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">My to-dos</h2>
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">OVERDUE</h3>
          <div className="bg-[#52575D] p-4 rounded-lg mb-3">TASK 1 MONGO</div>
          <div className="bg-[#52575D] p-4 rounded-lg">TASK 2 MONGO</div>
        </div>
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">TODAY</h3>
          <div className="bg-[#52575D] p-4 rounded-lg mb-3">TASK 3 MONGO</div>
        </div>
        {/* More task sections like LATER, COMPLETED can go here */}
      </section>

      {/* Task Details (8/12) */}
      <section className="w-8/12 bg-[#575757] p-6 text-white">
        <div className="bg-[#41444B] p-4 rounded-lg mb-4">
          <h3 className="font-semibold">TASK 1 MONGO</h3>
        </div>
        <div className="bg-[#41444B] p-4 rounded-lg mb-4">
          <span>📅 18 APR, 7:00 AM</span>
        </div>
        <div className="bg-[#41444B] p-4 rounded-lg">
          <span>📓 Notes</span>
        </div>
        {/* Bottom delete icon */}
        <div className="absolute bottom-4 right-6 text-white text-xl">
          🗑️
        </div>
      </section>
    </div>
  );
}
