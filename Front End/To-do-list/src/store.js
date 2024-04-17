import {configureStore} from "@reduxjs/toolkit";
import {default as taskReducer} from  './features/task/taskSlice';
import {default as userReducer} from  './features/user/userSlice';

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        user: userReducer,
    },
})