const initialState = {
  tasks: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task, index) =>
            index === action.payload.taskId
                ? { ...task, ...action.payload.updatedTaskData }
                : task
        ),
      };
    case 'UPDATE_TASK_STATUS':
      const taskId = action.payload.taskId;
      const updatedTasks = state.tasks.map((task, i) =>
          i === taskId ? { ...task, isCompleted: true } : task
      );
      return {
        ...state,
        tasks: updatedTasks,
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(
            (task, index) => index !== action.payload.taskId
        ),
      };
    default:
      return state;
  }
};

module.exports = taskReducer;