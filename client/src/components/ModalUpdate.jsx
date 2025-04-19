import React, { useState, useEffect } from "react";

export default function ModalUpdate({ handleUpdateTask, openUpdateModal, taskDetails }) {
  const [updatedTask, setUpdatedTask] = useState({
    task: "",
    datetime: "",
    notes: "",
  });

  const [errors, setErrors] = useState({
    task: false,
    datetime: false,
    notes: false,
  });

  // Helper to format a date string for <input type="datetime-local" />
  function formatDateForInput(value) {
    const date = new Date(value);
    const pad = (num) => String(num).padStart(2, "0");
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  // Initialize form when taskDetails changes
  useEffect(() => {
    if (taskDetails) {
      setUpdatedTask({
        task: taskDetails.task || "",
        datetime: taskDetails.datetime
          ? formatDateForInput(taskDetails.datetime)
          : "",
        notes: taskDetails.notes || "",
      });
      setErrors({ task: false, datetime: false, notes: false });
    }
  }, [taskDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({ ...prev, [name]: value }));
    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSave = () => {
    // Validate required fields
    const newErrors = {
      task: updatedTask.task.trim() === "",
      datetime: updatedTask.datetime.trim() === "",
      notes: updatedTask.notes.trim() === "",
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) return;

    // Convert local datetime string to UTC ISO for backend
    const localDate = new Date(updatedTask.datetime);
    const payload = {
      ...updatedTask,
      datetime: localDate.toISOString(),
    };

    handleUpdateTask(taskDetails._id, payload);
  };

  return (
    <div className="modal fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-[#CABFAB] w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
        {/* Title input */}
        <div
          className={`bg-[#DFD8C8] p-4 rounded-lg shadow-md ${
            errors.task ? "border-2 border-red-500" : ""
          }`}
        >
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
        <div
          className={`bg-[#DFD8C8] p-4 rounded-lg shadow-md ${
            errors.datetime ? "border-2 border-red-500" : ""
          }`}
        >
          <input
            type="datetime-local"
            name="datetime"
            value={updatedTask.datetime}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-sm text-[#141414]"
          />
        </div>
        {/* Notes input */}
        <div
          className={`bg-[#DFD8C8] p-4 rounded-lg shadow-md ${
            errors.notes ? "border-2 border-red-500" : ""
          }`}
        >
          <textarea
            name="notes"
            placeholder="📓 Notes"
            value={updatedTask.notes}
            onChange={handleChange}
            className="w-full h-24 bg-transparent outline-none text-[#141414]"
          />
        </div>
        {/* Action buttons */}
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