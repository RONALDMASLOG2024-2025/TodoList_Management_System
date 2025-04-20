import React, { useState } from "react";
import axios from "axios";

export default function ModalAdd({ handleAddTask, user, getTasks }) {
  const [task, setTask] = useState("");
  const [datetimeLocal, setDatetimeLocal] = useState(
    // initialize to “now” in local time for the <input type="datetime-local">
    new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16)
  );
  const [notes, setNotes] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState({
    task: false,
    datetimeLocal: false,
    notes: false,
  });

  const handleSaveTask = async () => {
    // 1️⃣ Validate
    const newErrors = {
      task: task.trim() === "",
      datetimeLocal: datetimeLocal.trim() === "",
      notes: notes.trim() === "",
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    try {
      // 2️⃣ Get token
      const idToken = await user.getIdToken();

      // 3️⃣ Convert the local datetime string -> JS Date -> UTC ISO
      //
      //    new Date(datetimeLocal) treats the string as local time,
      //    then .toISOString() outputs the UTC equivalent.
      const datetimeUTC = new Date(datetimeLocal).toISOString();

      // 4️⃣ POST using datetimeUTC
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/tasks`,
        {
          task,
          datetime: datetimeUTC,
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

      // 5️⃣ Refresh and close
      await getTasks(user.uid);
      handleAddTask();
    } catch (error) {
      console.error(
        "Error saving task:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="modal fixed inset-0 bg-black/70 backdrop-opacity-100 flex items-center backdrop-blur-xs justify-center z-50">
      <div className="bg-[#CABFAB] w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
        {/* Task Name */}
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

        {/* DateTime Picker (local time) */}
        <div className="bg-[#DFD8C8] p-4 rounded-lg shadow-md">
          <input
            type="datetime-local"
            value={datetimeLocal}
            onChange={(e) => setDatetimeLocal(e.target.value)}
            className={`w-full bg-transparent outline-none text-sm text-[#141414] ${
              errors.datetimeLocal ? "border border-red-500 rounded-md" : ""
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

        {/* Actions */}
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
