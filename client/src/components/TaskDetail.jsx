import React from "react";
import {
 
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

export default function TaskDetail({
  handleUpdateTask,
  handleDeleteTask,

}) {
  return (
    <>
    <div className="bg-[#DFD8C8] p-4 rounded-lg mb-4 shadow-md">
              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  defaultValue="TASK 1 MONGO"
                  className="font-semibold text-lg bg-transparent outline-none flex-1"
                  disabled
                />
    
                <button
                  type="button"
                  onClick={handleUpdateTask} // Replace with your actual update function
                  className="text-violet-600 hover:text-violet-800 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faPenToSquare} className="w-5 h-5" />
                </button>
    
                <button
                  onClick={handleDeleteTask} // Replace with your delete function
                  className="text-red-600 hover:text-red-800 transition-colors duration-200"
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
                disabled
              />
            </div>
    
            <div className="bg-[#DFD8C8] p-4 rounded-lg shadow-md">
              <textarea
                placeholder="📓 Notes"
                className="w-full h-24 bg-transparent outline-none"
                disabled
              />
            </div>

                  {isDeleteModalOpen && (
                    <ModalDelete handleDeleteTask={handleDeleteTask}></ModalDelete>
                  )}
            
                  {isUpdateModalOpen && (
                    <ModalUpdate
                      user={user}
                      getTasks={getTasks}
                      handleUpdateTask={handleUpdateTask}
                    ></ModalUpdate>
                  )}
    </>
  );
}
