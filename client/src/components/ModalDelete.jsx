import React from "react";

export default function ModalDelete({
  handleDeleteTask,
  handleConfirmDelete,
  taskDetails,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-[#DFD8C8] p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-[#141414] mb-4">
          Delete Task?
        </h2>
        <p className="text-sm md:text-base text-gray-700 mb-6">
          Are you sure you want to delete this task? This action cannot be
          undone.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => handleConfirmDelete(taskDetails._id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition w-full sm:w-auto"
          >
            Yes, Delete
          </button>
          <button
            onClick={handleDeleteTask}
            className="bg-[#CABFAB] hover:bg-amber-300 text-[#141414] px-4 py-2 rounded-lg transition w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
