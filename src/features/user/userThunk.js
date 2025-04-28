import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const login = createAsyncThunk(
    'user/login',
    async (user, { rejectWithValue }) => {
        try {
            const { data: req } = await axiosApi.post('/login', user);
            return req.data;
        } catch (e) {
            throw e;
        }
    }
);

export const register = createAsyncThunk(
    'user/register',
    async (user) => {
        try {
            const { data: req } = await axiosApi.post('/register', user);
            return req;
        } catch (e) {
            throw new Error(e);
        }
    }
);