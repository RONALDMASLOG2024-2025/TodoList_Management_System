import React from 'react'

export default function ModalUpdate({handleUpdateTask}) {
  return (
    <div className="modal fixed inset-0 bg-black/70 bg-op backdrop-opacity-100 flex items-center backdrop-blur-xs justify-center z-50">
    <div className="bg-[#CABFAB] w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
      {/* Title + Input */}
      <div className="bg-[#DFD8C8] p-4 rounded-lg shadow-md">
        <input
          type="text"
          defaultValue="TASK 1 MONGO"
          className="w-full font-semibold text-lg bg-transparent outline-none text-[#141414]"
        />
      </div>

      {/* DateTime Picker */}
      <div className="bg-[#DFD8C8] p-4 rounded-lg shadow-md">
        <input
          type="datetime-local"
          className="w-full bg-transparent outline-none text-sm text-[#141414]"
          defaultValue={new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, 16)}
        />
      </div>

      {/* Notes */}
      <div className="bg-[#DFD8C8] p-4 rounded-lg shadow-md">
        <textarea
          placeholder="📓 Notes"
          className="w-full h-24 bg-transparent outline-none text-[#141414]"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition"
          onClick={handleUpdateTask}
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold transition"
        >
          Save
        </button>
      </div>
    </div>
  </div>
  )
}
