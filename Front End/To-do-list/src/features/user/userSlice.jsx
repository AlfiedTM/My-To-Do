import { asyncThunkCreator, buildCreateSlice, createSlice } from "@reduxjs/toolkit";
import { FetchUsersTasks } from "../../actions/tasks";
import { axiosInstance, deleteTaskById, fetchAllUsersTasks, invalidateUser, setAuthToken, signIn } from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const user = {
    user: null,
    isLoggedIn: false,
    isRegistering: false,
    isValidating: true,
    isValidToken: false,
    isSigningIn: false,
    isValidLoginCredentials: false,
    isError: false
}


const createSliceWithThunks = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});


const userSlice = createSliceWithThunks({
    name: 'user',
    initialState: user,
    reducers: (create) => ({
        validateToken: create.asyncThunk(
            async () => {
                return await axiosInstance.post(`http://localhost:8080/auth/validateToken`);
            }
            ,
            {
                pending: (state) => {
                    state.isValidating = true;
                },
                rejected: (state) => {
                    state.isValidating = false;
                },
                fulfilled: (state, action) => {
                    state.isValidating = false;
                    const isValidToken = action.payload.data.response === "True" ? true : false;
                    state.isLoggedIn = isValidToken;
                    state.isValidToken = isValidToken
                    // Clear token if the token has expired
                    if (!isValidToken) {
                        invalidateUser();
                    }
                },
            }
        ),
        loginUser: create.asyncThunk(
            async (action) => {
                return await signIn(action);
                // onSuccess();
            },
            {
                pending: (state) => {
                    state.isSigningIn = true;
                    // state.isValidLoginCredentials = false;
                    // state.isError = false;
                },
                rejected: (state) => {
                    state.isSigningIn = false;
                    state.isError = true;
                },
                fulfilled: (state, action) => {
                    state.isSigningIn = false;

                    if (action.payload.data.statusCode == 200) {
                        setAuthToken(action.payload.data)
                        state.isLoggedIn = true;
                        state.isValidToken = true;
                        state.isValidLoginCredentials = true;
                    } else {
                        state.isError = true;
                    }
                    const { response } = action.payload;
                    state.isValidToken = response == "True" ? true : false;
                },
            }

        ),
        logOut: (state) => {
            invalidateUser();
            return { ...state, ...user };
        },
    }),
})


// console.log(taskSlice)
export const { validateToken, loginUser, logOut } = userSlice.actions;

export default userSlice.reducer;