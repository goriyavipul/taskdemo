import {
  TaskActionTypes,
  ADD_TASK,
  TaskState,
  UPDATE_TASK,
  DELETE_TASK,
  UPDATE_TASK_STATUS,
} from "../types/taskTypes";

const initialState: TaskState = {
  tasks: [],
};

const taskReducer = (
  state = initialState,
  action: TaskActionTypes,
): TaskState => {debugger
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task, index) =>
          index === action.payload.taskId
            ? { ...task, ...action.payload.updatedTaskData }
            : task,
        ),
      };
    case UPDATE_TASK_STATUS:
      const taskId = action.payload.taskId;
      const updatedTasks = state.tasks.map((task, i) =>
          i === taskId ? { ...task, isCompleted: true } : task
      );
      return {
        ...state,
        tasks: updatedTasks,
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(
          (task, index) => index !== action.payload.taskId,
        ),
      };
    default:
      return state;
  }
};

export default taskReducer;
