import React, { useState } from "react";
import axios from "axios";

export default function ModalAdd({ handleAddTask, user, getTasks }) {
  // State to manage input fields
  const [task, setTask] = useState("TASK 1 MONGO");
  const [datetime, setDatetime] = useState(
    new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16)
  );
  const [notes, setNotes] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  // Function to handle saving the task
  const handleSaveTask = async () => {
    try {
      // Assuming `idToken` is already retrieved from Firebase
      const idToken = await user.getIdToken();
      console.log("Firebase ID Token:", idToken);
      // Make the POST request
      const response = await axios.post(
        "/api/tasks",
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

      // Handle success
      console.log("Task saved:", response.data);
      await getTasks(user.uid);
      handleAddTask(); // Close modal or reset form
    } catch (error) {
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
            onChange={(e) => setTask(e.target.value)}
            className="w-full font-semibold text-lg bg-transparent outline-none text-[#141414]"
          />
        </div>

        {/* DateTime Picker */}
        <div className="bg-[#DFD8C8] p-4 rounded-lg shadow-md">
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-[#141414]"
          />
        </div>

        {/* Notes */}
        <div className="bg-[#DFD8C8] p-4 rounded-lg shadow-md">
          <textarea
            placeholder="📓 Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-24 bg-transparent outline-none text-[#141414]"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition"
            onClick={handleAddTask} // Call the passed function (to handle modal close)
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold transition"
            onClick={handleSaveTask} // Trigger save task functionality
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
