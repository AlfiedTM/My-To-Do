import { FETCH_USERS_TASKS, FETCH_USERS_TASK } from "../constants/contants";

// Users tasks
export const userTasks = (data = [], action)=>{
    switch(action.type){
        case FETCH_USERS_TASKS:
            return action.payload;

            default:
                return data;
    }
}

// User's task
export const userTask = (data =[], action) =>{
    switch(action.type){
        case FETCH_USERS_TASK:
            return action.payload;

            default:
                return data;
    }
}

const tasks = {userTask, userTasks}
export default tasks;

