/*Tasks*/
import {fetchAllUsersTasks, fetchTaskById, updateTask} from "../api/index.jsx";
import {FETCH_USERS_TASK, FETCH_USERS_TASKS, UPDATE_USERS_TASK} from "../constants/contants.jsx";

export const FetchUsersTasks = (onSuccess, onError) => async (dispatch) => {
    try {
        const {data} = await fetchAllUsersTasks();
        console.log(data);
        onSuccess();
        return data;
    }catch ( error){
        onError();
    }
}

//Fetch user's task
export const FetchUsersTask = (taskId, onSuccess, onError) => async (dispatch) => {
    try {
        const {response} = await fetchAllUsersTasks(taskId);
        dispatch(
            {
                type: FETCH_USERS_TASK,
                payload: response.task
            }
        )
        onSuccess();
    }catch ( error){
        onError();
    }
}

//Update user's task
export const UpdateUsersTask = (taskId, update, onSuccess, onError) => async (dispatch) => {
    try {
        const {response} = await updateTask(taskId, update);
        dispatch(
            {
                type: UPDATE_USERS_TASK,
                payload: response.task
            }
        )
        onSuccess();
    }catch ( error){
        onError();
    }
}