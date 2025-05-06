import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.js";

export const createPaymentManual = createAsyncThunk(
    "createPaymentManual",
    async (paymentManualMutation)=>{
        try {
            const {data: res} = await axiosApi.post("/paymentManual", paymentManualMutation);

            return res.data;
        }catch(error){
            throw error;
        }
    }
);

export const getPaymentHistory = createAsyncThunk(
    "getPaymentHistory",
    async (username)=>{
        try {
            const {data: res} = await axiosApi.get("/paymentHistory", username);

            return res.data;
        }catch(error){
            throw error;
        }
    }
);

export const getRegisteredDevices = createAsyncThunk(
    "getRegisteredDevices",
    async (username)=>{
        try {
            const {data: res} = await axiosApi.get("/registeredDevices", username);

            return res.data;
        }catch(error){
            throw error;
        }
    }
);