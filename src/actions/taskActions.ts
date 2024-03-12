import {
  ADD_TASK,
  DELETE_TASK,
  Task,
  TaskActionTypes,
  UPDATE_TASK,
  UPDATE_TASK_STATUS,
} from "../types/taskTypes";

export const addTask = (task: Task) => {
  return {
    type: ADD_TASK,
    payload: task,
  };
};

export const updateTaskData = (taskId: number, updatedTaskData: any) => ({
  type: UPDATE_TASK,
  payload: { taskId, updatedTaskData },
});
export const updateTaskStatus = (taskId: number) => ({
  type: UPDATE_TASK_STATUS,
  payload: { taskId },
});

export const deleteTask = (taskId: number) => ({
  type: DELETE_TASK,
  payload: { taskId },
});
