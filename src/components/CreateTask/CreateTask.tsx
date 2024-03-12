import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { addTask } from "../../actions/taskActions";
import {useRouter} from "next/router";
import {Task} from "../../types/taskTypes";

const CreateTask = () => {
  const router =   useRouter()
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      isCompleted: false,
    },
  });

  const onSubmit = (data: Task ) => {
    dispatch(addTask(data));
    reset()
    toast.success("Task created successfully", {
      position: "top-right"
    });
  };

  const handleRouteChange = () => {
    router.push('/tasklist')
  }

  return (
    <div className="px-6">
      <div className="text-center text-white text-4xl">Task Management</div>
      <div className="mt-6">
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
            onClick={handleSubmit(onSubmit)}
          >
            <span className="text-white text-base">Add task</span>
          </button>
          <button
            className="ml-2 mt-5 rounded-lg bg-[#0575E6] px-6 py-2 flex"
            onClick={handleRouteChange}
          >
            <span className="text-white text-base">Go to task list</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
