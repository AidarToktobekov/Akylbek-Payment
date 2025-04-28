import { createSlice } from '@reduxjs/toolkit';
import {createPaymentManual} from "./paymentsThunk.js";

const initialState = {
    paymentManualLoading: false,
};

const PaymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createPaymentManual.pending, (state) => {
            state.paymentManualLoading = true;
        });
        builder.addCase(createPaymentManual.fulfilled, (state, { payload: res }) => {
            state.user = {
                message: res.message,
                token: res.token,
            };
            state.paymentManualLoading = false;
        });
        builder.addCase(createPaymentManual.rejected, (state, { payload: error }) => {
            state.paymentManualLoading = false;
        });
    },
    selectors: {
        paymentManualLoading: (state) => state.paymentManualLoading,
    },
});

export const paymentsReducer = PaymentsSlice.reducer;
export const {
    paymentManualLoading,
} = PaymentsSlice.selectors;
