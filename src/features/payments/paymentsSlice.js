import { createSlice } from '@reduxjs/toolkit';
import {createPaymentManual, getPaymentHistory, getRegisteredDevices} from "./paymentsThunk.js";

const initialState = {
    registeredDevices: [
        {
            id: 62,
            qrId: "ОЙНО-1",
            username: "merios",
            name: "esp8266",
            deviceId: "E0:98:06:1A:3F:36",
            address: "г. Бишкек ул Ауэзова 1/5 ОЙНО-1",
            signal_strength: null,
            lastUpdate: null
        },
    ],
    registeredDevicesLoading: false,
    paymentHistory: [
        {
            id: 3635,
            transactionId: "w5243-я;'--,jhgh,nяысысm-bhgv",
            qrId: "ОЙНО-1",
            amount: "50.00",
            createdAt: "2025-04-12T07:49:38.000Z",
            status: "done",
            payer: "manual"
        },
    ],
    paymentHistoryLoading: false,
    paymentManualLoading: false,
    paymentManualError: null,
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
        builder.addCase(createPaymentManual.rejected, (state, { payload: error }) => {
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
        selectPaymentManualError: (state) => state.paymentManualError,
    },
});

export const paymentsReducer = PaymentsSlice.reducer;
export const {
    selectRegisteredDevices,
    selectRegisteredDevicesLoading,
    selectPaymentHistory,
    selectPaymentHistoryLoading,
    selectPaymentManualLoading,
    selectPaymentManualError,
} = PaymentsSlice.selectors;
