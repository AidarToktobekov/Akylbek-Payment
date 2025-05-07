import { createSlice } from '@reduxjs/toolkit';
import {createPaymentManual, getPaymentHistory, getRegisteredDevices} from "./paymentsThunk.js";

const initialState = {
    registeredDevices: [],
    registeredDevicesLoading: false,
    paymentHistory: [],
    paymentHistoryLoading: false,
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
            state.paymentManualLoading = false;
        });
        builder.addCase(createPaymentManual.rejected, (state) => {
            state.paymentManualLoading = false;
        });
        builder.addCase(getPaymentHistory.pending, (state) => {
            state.paymentHistoryLoading = true;
        });
        builder.addCase(getPaymentHistory.fulfilled, (state, { payload: res }) => {
            state.paymentHistory = res;
            state.paymentHistoryLoading = false;
        });
        builder.addCase(getPaymentHistory.rejected, (state, { payload: error }) => {
            state.paymentHistoryLoading = false;
        });
        builder.addCase(getRegisteredDevices.pending, (state) => {
            state.registeredDevicesLoading = true;
        });
        builder.addCase(getRegisteredDevices.fulfilled, (state, { payload: res }) => {
            state.registeredDevices = res;
            state.registeredDevicesLoading = false;
        });
        builder.addCase(getRegisteredDevices.rejected, (state, { payload: error }) => {
            state.registeredDevicesLoading = false;
        });
    },
    selectors: {
        selectRegisteredDevices: (state) => state.registeredDevices,
        selectRegisteredDevicesLoading: (state) => state.registeredDevicesLoading,
        selectPaymentHistory: (state) => state.paymentHistory,
        selectPaymentHistoryLoading: (state) => state.paymentHistoryLoading,
        selectPaymentManualLoading: (state) => state.paymentManualLoading,
    },
});

export const paymentsReducer = PaymentsSlice.reducer;
export const {
    selectRegisteredDevices,
    selectRegisteredDevicesLoading,
    selectPaymentHistory,
    selectPaymentHistoryLoading,
    selectPaymentManualLoading,
} = PaymentsSlice.selectors;
