import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { axiosInstance, createTask, deleteTaskById, fetchAllUsersTasks, updateTask } from "../../api";


const userTasks = {
  tasks: [],
  task: {},
  isLoading: true,
  isCreating: false,
  isError: false,
  isFinished: false,
  isDeleting: false,
  isDeleted: false,
  isFetched: false,
  isUpdating: false,
  isUpdated: false,

};


const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const taskSlice = createSliceWithThunks({
  name: "tasks",
  initialState: userTasks,
  reducers: (create) => ({
    loadTasks: create.asyncThunk(
      async () => {
        return await fetchAllUsersTasks();
      }
      ,
      {
        pending: (state) => {
          state.isLoading = true;
        },
        rejected: (state) => {
          state.isLoading = false;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.tasks = action.payload.data.resource;
        },
      }
    ),
    removeTask: create.asyncThunk(
      async (taskId) => {
        return await deleteTaskById(taskId)

      }, {
      pending: (state) => {
        state.isDeleting = true;
      },
      rejected: (state) => {
        state.isError = true;
        state.isDeleted = false;
        state.isFinished = true;
      },
      fulfilled: (state, action) => {
        state.isDeleted = true;
        state.isError = false;
        state.isFinished = true;
        state.tasks = state.tasks.filter(task => task.id !== action.meta.arg);
      }
    }
    ),
    addTask: create.asyncThunk(
      async (newTask) => {
        return await createTask(JSON.stringify(newTask));
      },
      {
        pending: (state) => {
          state.isCreating = true;
        },
        rejected: (state) => {
          state.isCreating = false;
          state.isError = true;
          state.isFinished = true;
        },
        fulfilled: (state, action) => {
          state.isCreating = false;
          state.isFinished = true;
          if (action.payload.data.statusCode == 200) {
            state.isError = false;
            state.tasks.push(action.payload.data.resource);
          } else {
            state.isError = true;
          }
        },
      }
    ),
    fetchTask: (state, action) => {
      const taskId = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      return {
        ...state,
        task: task,
        isFetched: true,
      };
    },
    updateThisTask: create.asyncThunk(
      async (payload) => {
        return await updateTask(JSON.stringify(payload));
      },
      {
        pending: (state) => {
          state.isUpdating = true;
        },
        rejected: (state) => {
          state.isUpdating = false;
          state.isError = true;
          state.isFinished = true;
        },
        fulfilled: (state, action) => {
          state.isCreating = false;
          state.isError = false;
          state.isFinished = true;
          state.isUpdated = true;
          const updateTaskIndex = state.tasks.findIndex(obj => obj.id === action.payload.data.resource.id);

          if (updateTaskIndex != -1) {
            state.tasks[updateTaskIndex] = action.payload.data.resource;
          }
        },
      }
    ),
    finishedTask: (state) => {
      state.isFinished = false;
    }
  }),
});
export const { removeTask, fetchTask, loadTasks, addTask, updateThisTask, finishedTask } = taskSlice.actions;

export default taskSlice.reducer;
