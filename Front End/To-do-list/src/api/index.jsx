import axios from "axios";

/*Global Headers set up*/
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors?.request.use(req => {
    const user = localStorage.getItem("user")
    if (user && user != "undefined") {
        req.headers.authorization = `Bearer ${user}`
    }
    return req
});

export const setAuthToken = (user) => {
    window.localStorage.setItem("user", user.token);
    window.localStorage.setItem("refresh", user.refreshToken);
}

export const getAuthToken = () => {
    return window.localStorage.getItem("user");
}

export const invalidateUser = () => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("refresh");
}

/*ROUTES*/

/*Users*/
export const signIn = (payload) => axiosInstance.post('/auth/signIn', payload);
export const signUp = async (payload) => axiosInstance.post('/user/register', payload);

/*TASKS*/
export const fetchAllUsersTasks = async () => axiosInstance.get(`/task`);
export const createTask = async (task) => axiosInstance.post(`/task/new`, task);
export const fetchTaskById = async (taskId) => axiosInstance.get(`/task/${taskId}`);
export const updateTask = async (update) => axiosInstance.put(`/task`, update);
export const deleteTaskById = async (taskId) => axiosInstance.delete(`/task/${taskId}`);