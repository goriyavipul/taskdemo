import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import {
  deleteTask,
  updateTaskData,
  updateTaskStatus,
} from "../../actions/taskActions";
import { toast } from "react-toastify";
import Modal from "@components/Common/Modal";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";

const CreateTask = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [updateModal, setUpdateModal] = useState(false);
  const [taskId, setTaskId] = useState("");

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      isCompleted: false,
    },
  });

  const tasks =
    useSelector((state: AppState) => {
      return state.tasks;
    }) || [];

  const taskStatusChange = (index, title) => {
    dispatch(updateTaskStatus(index));
    toast.success(`${title} mark as completed`, {
      position: "top-right",
    });
  };
  const handleDeleteTask = (taskId, title) => {
    dispatch(deleteTask(taskId));
    toast.success(`${title} deleted successfully`, {
      position: "top-right",
    });
  };
  const updateTask = () => {
    const updatedData = getValues();
    dispatch(updateTaskData(taskId, updatedData));
    reset();
    setUpdateModal(false);
    setTaskId("");
    toast.success(`data updated successfully`, {
      position: "top-right",
    });
  };

  const handleUpdateConformation = (index, updatedData) => {
    setUpdateModal(true);
    setTaskId(index);
    setValue("title", updatedData?.title);
    setValue("description", updatedData?.description);
    setValue("dueDate", updatedData?.dueDate);
  };

  const handleUpdateClose = () => {
    setUpdateModal(false);
    setTaskId("");
    reset();
  };

  return (
    <div className="px-6">
      <div className="flex items-center justify-between">
        <div />
        <div className="text-center text-white text-4xl">Task List</div>
        <button
          className="ml-2 rounded-lg bg-sky-500 px-6 py-2 flex"
          onClick={() => router.push("/")}
        >
          <span className="text-white text-base">Back to create task</span>
        </button>
      </div>
      <Modal open={updateModal} onClose={handleUpdateClose}>
        <div className="p-6">
          <div className="md:grid grid-cols-12 gap-4">
            <div className="col-span-2 text-sm font-medium text-white">
              Title:
            </div>
            <Controller
              name="title"
              control={control as any}
              render={({ field }) => (
                <div className="col-span-4">
                  <input
                    className="w-full p-3 bg-transparent rounded-lg	border border-[#393C49] focus-visible:outline-none text-white h-11"
                    placeholder="Title"
                    required
                    {...register("title", {
                      required: "Title is required",
                    })}
                    {...field}
                  />
                  {errors?.title?.message && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors?.title?.message || ""}
                    </div>
                  )}
                </div>
              )}
            />
          </div>
          <div className="mt-4 md:grid grid-cols-12 gap-4 items-start">
            <div className="col-span-2 text-sm font-medium text-white">
              Description:
            </div>
            <Controller
              name="description"
              control={control as any}
              render={({ field }) => (
                <div className="col-span-4">
                  <textarea
                    className="w-full p-3 bg-transparent rounded-lg	border border-[#393C49] focus-visible:outline-none text-white min-h-32"
                    placeholder="Description"
                    required
                    {...register("description", {
                      required: "Description is required",
                    })}
                    {...field}
                  />
                  <span className="text-red-500 text-sm mt-1">
                    {errors?.description?.message || ""}
                  </span>
                </div>
              )}
            />
          </div>
          <div className="mt-4 md:grid grid-cols-12 gap-4 items-start">
            <div className="col-span-2 text-sm font-medium text-white">
              Due Date:
            </div>
            <Controller
              name="dueDate"
              control={control as any}
              render={({ field }) => (
                <div className="col-span-4">
                  <input
                    type="date"
                    className="w-full p-3 bg-transparent rounded-lg border border-[#393C49] focus-visible:outline-none text-white h-11"
                    required
                    {...register("dueDate", {
                      required: "Due Date is required",
                    })}
                    {...field}
                  />
                  {errors?.dueDate?.message && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors?.dueDate?.message || ""}
                    </div>
                  )}
                </div>
              )}
            />
          </div>
          <div className="flex">
            <button
              className="mt-5 rounded-lg bg-[#0575E6] px-6 py-2 flex"
              onClick={handleSubmit(updateTask)}
            >
              <span className="text-white text-base">Update</span>
            </button>
            <button
              className="ml-2 mt-5 rounded-lg bg-[#0575E6] px-6 py-2 flex"
              onClick={handleUpdateClose}
            >
              <span className="text-white text-base">Cancel</span>
            </button>
          </div>
        </div>
      </Modal>
      <div className="relative overflow-x-auto mt-4">
        <table className="rounded-2xl w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                DueDate
              </th>
              <th scope="col" className="px-6 py-3">
                isCompleted
              </th>
              <th scope="col" className="px-6 py-3">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((item, index) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <td className="px-6 py-4">{item?.title || ""}</td>
                  <td className="px-6 py-4">{item?.description || ""}</td>
                  <td className="px-6 py-4">{item?.dueDate || ""}</td>
                  <td className="px-6 py-4">
                    {item.isCompleted ? (
                      <span className="text-emerald-600">Completed</span>
                    ) : (
                      "Pending"
                    )}
                  </td>
                  <td className="flex items-center">
                    {!item.isCompleted && (
                      <button
                        className="ml-2 rounded-lg bg-green-500 px-6 py-2 flex"
                        onClick={() => taskStatusChange(index, item?.title)}
                      >
                        <span className="text-white text-base">
                          Mark as Completed
                        </span>
                      </button>
                    )}
                    <button
                      className="ml-2 rounded-lg bg-red-500 px-6 py-2 flex"
                      onClick={() => handleDeleteTask(index, item?.title)}
                    >
                      <span className="text-white text-base">Delete</span>
                    </button>
                    <button
                      className="ml-2 rounded-lg bg-sky-500 px-6 py-2 flex"
                      onClick={() => handleUpdateConformation(index, item)}
                    >
                      <span className="text-white text-base">Update</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateTask;
