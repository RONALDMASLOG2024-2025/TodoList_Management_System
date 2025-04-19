import React, { useState } from "react";
import axios from "axios";

export default function ModalAdd({ handleAddTask, user, getTasks }) {
  const [task, setTask] = useState("");
  const [datetime, setDatetime] = useState(
    new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16)
  );
  const [notes, setNotes] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState({
    task: false,
    datetime: false,
    notes: false,
  });

  const handleSaveTask = async () => {
    const newErrors = {
      task: task.trim() === "",
      datetime: datetime.trim() === "",
      notes: notes.trim() == "",
    };

    setErrors(newErrors);

    if (newErrors.task || newErrors.datetim || newErrors.notes) {
      return; // Stop saving if there are errors
    }

    try {
      const idToken = await user.getIdToken();

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/tasks`,
        {
          task,
          datetime,
          notes,
          isCompleted,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      await getTasks(user.uid);
      handleAddTask(); // Close modal
    } catch (error) {
      console.log("DAOT AND LINE 43 SA ADD MODAL");
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="modal fixed inset-0 bg-black/70 backdrop-opacity-100 flex items-center backdrop-blur-xs justify-center z-50">
      <div className="bg-[#CABFAB] w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
        {/* Title + Input */}
        <div className="bg-[#DFD8C8] p-4 rounded-lg shadow-md">
          <input
            type="text"
            value={task}
            placeholder="Your task name!"
            onChange={(e) => setTask(e.target.value)}
            className={`w-full font-semibold text-lg bg-transparent outline-none text-[#141414] ${
              errors.task ? "border border-red-500 rounded-md" : ""
            }`}
          />
        </div>

        {/* DateTime Picker */}
        <div className="bg-[#DFD8C8] p-4 rounded-lg shadow-md">
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className={`w-full bg-transparent outline-none text-sm text-[#141414] ${
              errors.datetime ? "border border-red-500 rounded-md" : ""
            }`}
          />
        </div>

        {/* Notes */}
        <div className="bg-[#DFD8C8] p-4 rounded-lg shadow-md">
          <textarea
            placeholder="📓 Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={`w-full h-24 bg-transparent outline-none text-[#141414] ${
              errors.notes ? "border border-red-500 rounded-md" : ""
            }`}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition"
            onClick={handleAddTask}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold transition"
            onClick={handleSaveTask}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
