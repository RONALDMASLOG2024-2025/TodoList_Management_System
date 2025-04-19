import React, { useEffect, useState } from "react";
import { auth, signOut, getAuth } from "../firebase";
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
import axios from "axios";

export default function Todo({ user }) {
  const [isAddModalPressed, setAddModalPressed] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [task, setTask] = useState([]);

  // Define "today" once at the top (at local midnight)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (user) {
      getTasks(user.uid);
    }
  }, [user]);

  const getTasks = async (userId) => {
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const token = await user.getIdToken();

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tasks/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Tasks:", response.data);
      setTask(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Failed to fetch tasks:",
        error.response?.data || error.message
      );
      return [];
    }
  };

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
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      const token = await user.getIdToken();
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getTasks(user.uid);
      await setTaskDetails(updatedData);
      setIsUpdateModalOpen(false);
      console.log("Task updated successfully.");
    } catch (error) {
      console.error(
        "Error updating task:",
        error.response?.data || error.message
      );
    }
  };

  const handleToggle = async (taskId) => {
    // Toggle logic here
    await updateTaskStatus(taskId);
  };

  const openUpdateModal = () => {
    setIsUpdateModalOpen(!isUpdateModalOpen);
  };

  const updateTaskStatus = async (taskId) => {
    try {
      const taskToUpdate = task.find((t) => t._id === taskId);
      const updated = {
        ...taskToUpdate,
        isCompleted: !taskToUpdate.isCompleted,
      };

      const idToken = await user.getIdToken(); // if using Firebase auth
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`,
        updated,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      await getTasks(user.uid); // refresh task list
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  };

  const [taskDetails, setTaskDetails] = useState(null); // null initially

  const handletaskDetails = (task) => {
    setTaskDetails(task);
  };

  function formatDateForInput(value) {
    const date = new Date(value);
    const offset = date.getTimezoneOffset(); // in minutes
    const localDate = new Date(date.getTime() - offset * 60000); // adjust to local
    return localDate.toISOString().slice(0, 16);
  }

  const handleConfirmDelete = async (taskId) => {
    try {
      const token = await user.getIdToken();
      console.log("Task deleted" + taskId);
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getTasks(user.uid);

      setTaskDetails(null);
      setIsDeleteModalOpen(!isDeleteModalOpen);
    } catch (error) {
      console.error(
        "Error deleting task:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen font-sans">
      {/* Sidebar - Tasks */}
      <section
        className="w-full h-full md:w-4/12  bg-black
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

        <h2
          className="text-md text-left font-bold mb-4"
          onClick={() => {
            setTaskDetails(null);
            getTasks(user.uid);
          }}
        >
          My To-dos
        </h2>

        {
          // OVERDUE TASKS
          task.some((item) => {
            const taskDate = new Date(item.datetime);
            taskDate.setHours(0, 0, 0, 0);
            return taskDate < today && !item.isCompleted;
          }) && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-2 text-left">
                OVERDUE
              </h3>
              {task.map((item) => {
                const taskDate = new Date(item.datetime);
                taskDate.setHours(0, 0, 0, 0);
                if (taskDate < today && !item.isCompleted) {
                  return (
                    <Task
                      key={item.id}
                      task={item}
                      onToggle={handleToggle}
                      onSelectedTask={handletaskDetails}
                    />
                  );
                }
                return null;
              })}
            </div>
          )
        }

        {
          // TODAY TASKS
          task.some((item) => {
            const taskDate = new Date(item.datetime);
            taskDate.setHours(0, 0, 0, 0);
            return taskDate.getTime() === today.getTime() && !item.isCompleted;
          }) && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-2 text-left">
                TODAY
              </h3>
              {task.map((item) => {
                const taskDate = new Date(item.datetime);
                taskDate.setHours(0, 0, 0, 0);
                if (
                  taskDate.getTime() === today.getTime() &&
                  !item.isCompleted
                ) {
                  return (
                    <Task
                      key={item.id}
                      task={item}
                      onToggle={handleToggle}
                      onSelectedTask={handletaskDetails}
                    />
                  );
                }
                return null;
              })}
            </div>
          )
        }

        {
          // LATER TASKS
          task.some((item) => {
            const taskDate = new Date(item.datetime);
            taskDate.setHours(0, 0, 0, 0);
            return taskDate > today && !item.isCompleted;
          }) && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-2 text-left">
                LATER
              </h3>
              {task.map((item) => {
                const taskDate = new Date(item.datetime);
                taskDate.setHours(0, 0, 0, 0);
                if (taskDate > today && !item.isCompleted) {
                  return (
                    <Task
                      key={item.id}
                      task={item}
                      onToggle={handleToggle}
                      onSelectedTask={handletaskDetails}
                    />
                  );
                }
                return null;
              })}
            </div>
          )
        }

        {
          // COMPLETED TASKS
          task.some((item) => item.isCompleted) && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-2 text-left">
                COMPLETED
              </h3>
              {task.map((item) => {
                if (item.isCompleted) {
                  return (
                    <Task
                      key={item.id}
                      task={item}
                      onToggle={handleToggle}
                      onSelectedTask={handletaskDetails}
                    />
                  );
                }
                return null;
              })}
            </div>
          )
        }
      </section>

      {/* Task Details */}
      {taskDetails ? (
        <section className="relative w-full md:w-8/12 bg-[#CABFAB] p-6 text-[#141414]">
          <div className="bg-[#DFD8C8] p-4 rounded-lg mb-4 shadow-md">
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={taskDetails?.task}
                className="font-semibold text-lg bg-transparent outline-none flex-1"
                disabled
              />

              <button
                type="button"
                onClick={openUpdateModal}
                id={taskDetails?._id}
                className="text-violet-600 hover:text-violet-800 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faPenToSquare} className="w-5 h-5" />
              </button>

              <button
                onClick={handleDeleteTask}
                className="text-red-600 hover:text-red-800 transition-colors duration-200"
                id={taskDetails?._id}
              >
                <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-[#DFD8C8] p-4 rounded-lg mb-4 shadow-md">
            <input
              type="datetime-local"
              className="w-full bg-transparent outline-none text-sm"
              value={
                taskDetails?.datetime
                  ? formatDateForInput(taskDetails.datetime)
                  : ""
              }
              disabled
            />
          </div>

          <div className="bg-[#DFD8C8] p-4 rounded-lg shadow-md">
            <textarea
              placeholder="📓 Notes"
              value={taskDetails?.notes || ""}
              className="w-full h-24 bg-transparent outline-none"
              disabled
            />
          </div>

          {isDeleteModalOpen && (
            <ModalDelete
              handleDeleteTask={handleDeleteTask}
              handleConfirmDelete={handleConfirmDelete}
              taskDetails={taskDetails}
            />
          )}

          {isUpdateModalOpen && (
            <ModalUpdate
              user={user}
              getTasks={getTasks}
              handleUpdateTask={handleUpdateTask}
              openUpdateModal={openUpdateModal}
              taskDetails={taskDetails}
            />
          )}
        </section>
      ) : (




        <section className="relative h-full w-full md:w-8/12 bg-[#CABFAB] p-6 text-[#141414] flex justify-center  items-center sm:bottom-0">
        <img
          src="/DoodleDo.png"
          alt=""
          className="h-full w-auto rounded-2xl"
        />
      </section>
      )}

      <button
        type="button"
        onClick={handleAddTask}
        className="fixed bottom-6 right-6 z-30 flex items-center justify-center gap-2 w-14 h-14 active:bg-white bg-gray-600/80 hover:bg-amber-500/80 text-amber-500 hover:text-white rounded-full shadow-md   shadow-black transition duration-300"
      >
        <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
      </button>

      {isAddModalPressed && (
        <ModalAdd
          getTasks={getTasks}
          handleAddTask={handleAddTask}
          user={user}
        />
      )}
    </div>
  );
}
