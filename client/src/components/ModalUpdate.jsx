import React, { useState, useEffect } from 'react';

export default function ModalUpdate({ handleUpdateTask, openUpdateModal, taskDetails }) {
  const [updatedTask, setUpdatedTask] = useState({
    task: '',
    datetime: '',
    notes: '',
  });

  // Sync initial task details into local state when modal opens
  useEffect(() => {
    if (taskDetails) {
      setUpdatedTask({
        task: taskDetails.task || '',
        datetime: taskDetails.datetime
          ? new Date(taskDetails.datetime).toISOString().slice(0, 16)
          : '',
        notes: taskDetails.notes || '',
      });
    }
  }, [taskDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    handleUpdateTask(taskDetails._id, updatedTask); // Pass ID and updated fields
  };

  return (
    <div className="modal fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-[#CABFAB] w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
        {/* Title + Input */}
        <div className="bg-[#DFD8C8] p-4 rounded-lg shadow-md">
          <input
            type="text"
            name="task"
            value={updatedTask.task}
            onChange={handleChange}
            className="w-full font-semibold text-lg bg-transparent outline-none text-[#141414]"
            placeholder="Task title"
          />
        </div>

        {/* DateTime Picker */}
        <div className="bg-[#DFD8C8] p-4 rounded-lg shadow-md">
          <input
            type="datetime-local"
            name="datetime"
            value={updatedTask.datetime}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-sm text-[#141414]"
          />
        </div>

        {/* Notes */}
        <div className="bg-[#DFD8C8] p-4 rounded-lg shadow-md">
          <textarea
            name="notes"
            placeholder="📓 Notes"
            value={updatedTask.notes}
            onChange={handleChange}
            className="w-full h-24 bg-transparent outline-none text-[#141414]"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition"
            onClick={openUpdateModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold transition"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
