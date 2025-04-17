import React, { useState } from "react";
import { auth, signOut } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faPlus,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import Task from "./Task";
import ModalAdd from "./ModalAdd";
import ModalDelete from "./ModalDelete";
import ModalUpdate from "./ModalUpdate";

export default function Todo({ user }) {
  const [isAddModalPressed, setAddModalPressed] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const handleAddTask = () => {
    setAddModalPressed(!isAddModalPressed);
  };

  const handleDeleteTask = () => {
    console.log("Task deleted");
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleUpdateTask = () => {
    setIsUpdateModalOpen(!isUpdateModalOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen font-sans">
      {/* Sidebar - Tasks */}
      <section
        className="w-full md:w-4/12  bg-black
       p-6 pt-0 text-white overflow-y-auto"
      >
        <div className="header flex items-center justify-between mb-4 pb-2 pt-6 sticky top-0 bg-black z-10">
          <div>
            <p className="xl:text-xl md:text-sm font-bold text-amber-200">
              {user.displayName}
            </p>
          </div>

          <button
            onClick={handleSignOut}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-md  hover:bg-gray-600 transition-colors duration-200 text-white active:bg-amber-500"
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="w-5 h-5 text-white"
            />
          </button>
        </div>

        <h2 className="text-md text-left font-bold mb-4">My To-dos</h2>

        {/* Overdue */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-2 text-left">
            OVERDUE
          </h3>
          <Task></Task>
          <Task></Task>
          <Task></Task>
          <Task></Task>
          <Task></Task>
        </div>

        {/* Today */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-2 text-left">
            TODAY
          </h3>
          <div className="bg-[#52575D] p-4 rounded-lg mb-3">TASK 3 MONGO</div>
        </div>

        {/* You can add LATER, COMPLETED sections too */}

        {/* LATER */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-2 text-left">
            LATER
          </h3>
          <div className="bg-[#52575D] p-4 rounded-lg mb-3">TASK 5 MONGO</div>
        </div>

        {/* COMPLETED */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-2 text-left">
            COMPLETED
          </h3>
          <div className="bg-[#52575D] p-4 rounded-lg mb-3">TASK 4 MONGO</div>
        </div>
      </section>

      {/* Task Details */}
      <section className="relative w-full md:w-8/12 bg-[#CABFAB] p-6 text-[#141414]">
        <div className="bg-[#DFD8C8] p-4 rounded-lg mb-4 shadow-md">
          <div className="flex items-center justify-between gap-2">
            <input
              type="text"
              defaultValue="TASK 1 MONGO"
              className="font-semibold text-lg bg-transparent outline-none flex-1"
            />
            <button
              type="button"
              onClick={handleUpdateTask} // Replace with your actual update function
              className="text-violet-600-600 hover:text-violet-600 transition mx-3"
            >
              <FontAwesomeIcon icon={faPenToSquare} className="w-4 h-4" />
         
            </button>
            <button
              onClick={handleDeleteTask} // Replace with your delete function
              className="text-red-600 hover:text-red-800 transition"
            >
              <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-[#DFD8C8] p-4 rounded-lg mb-4 shadow-md">
          <input
            type="datetime-local"
            className="w-full bg-transparent outline-none text-sm"
            defaultValue={new Date().toISOString().slice(0, 16)} // Format: "YYYY-MM-DDTHH:MM"
          />
        </div>

        <div className="bg-[#DFD8C8] p-4 rounded-lg shadow-md">
          <textarea
            placeholder="📓 Notes"
            className="w-full h-24 bg-transparent outline-none"
          />
        </div>

        <button
          type="button"
          onClick={handleAddTask} // Replace with your function
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center gap-2 w-14 h-14 active:bg-white bg-gray-600 hover:bg-amber-500 text-amber-500 hover:text-white rounded-full shadow-lg transition duration-300"
        >
          <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
        </button>
      </section>

      {isAddModalPressed && <ModalAdd handleAddTask={handleAddTask}></ModalAdd>}

      {isDeleteModalOpen && (
        <ModalDelete handleDeleteTask={handleDeleteTask}></ModalDelete>
      )}

      {isUpdateModalOpen && (
        <ModalUpdate handleUpdateTask={handleUpdateTask}></ModalUpdate>
      )}
    </div>
  );
}
