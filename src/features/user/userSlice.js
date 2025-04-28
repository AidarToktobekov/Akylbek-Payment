import { createSlice } from '@reduxjs/toolkit';
import { login, register } from './userThunk';

const initialState = {
    user: null,
    loginLoading: false,
    registerLoading: false,
};

const UsersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loginLoading = true;
        });
        builder.addCase(login.fulfilled, (state, { payload: res }) => {
            state.user = {
                message: res.message,
                token: res.token,
            };
            state.loginLoading = false;
        });
        builder.addCase(login.rejected, (state, { payload: error }) => {
            state.loginLoading = false;
        });
        builder.addCase(register.pending, (state) => {
            state.registerLoading = true;
        });
        builder.addCase(register.fulfilled, (state, {payload: res}) => {
            state.user = {
                message: res.message,
            };
            state.registerLoading = false;
        });
        builder.addCase(register.rejected, (state, { payload: error }) => {
            state.registerLoading = false;
        });
    },
    selectors: {
        selectUser: (state) => state.user,
        selectLoginLoading: (state) => state.loginLoading,
        selectRegisterLoading: (state) => state.registerLoading,
    },
});

export const userReducer = UsersSlice.reducer;
export const {
    selectUser,
    selectLoginLoading,
    selectRegisterLoading,
} = UsersSlice.selectors;
export const { logout } = UsersSlice.actions;
