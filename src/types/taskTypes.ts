export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS';
export const DELETE_TASK = 'DELETE_TASK';

export interface Task {
    taskId: number;
    index: Boolean;
    updatedTaskData: any;
    title: string;
    description: string;
    dueDate: string;
    isCompleted: boolean;
}

export interface AddTaskAction {
    type: typeof ADD_TASK;
    payload: Task;
}

export interface TaskState {
    tasks: Task[];
    loading?: boolean;
    error?: string | null;
}

export type TaskActionTypes = AddTaskAction;