import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.js";

export const createPaymentManual = createAsyncThunk(
    "paymentManual",
    async (paymentManualMutation)=>{
        try {
            const {data: res} = await axiosApi.get("/paymentManual", paymentManualMutation);

            return res.data;
        }catch(error){
            throw error;
        }
    }
);