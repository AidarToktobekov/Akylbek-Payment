import {
    CircularProgress,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import {
    selectPaymentHistory,
    selectPaymentHistoryLoading,
    selectPaymentManualError,
    selectPaymentManualLoading,
    selectRegisteredDevices,
    selectRegisteredDevicesLoading
} from "../../features/payments/paymentsSlice.js";
import React, {useEffect} from "react";

const MainPage = ()=>{

    const dispatch = useAppDispatch();
    const registeredDevices = useAppSelector(selectRegisteredDevices);
    const registeredDevicesLoading = useAppSelector(selectRegisteredDevicesLoading);
    const paymentHistory = useAppSelector(selectPaymentHistory);
    const paymentHistoryLoading = useAppSelector(selectPaymentHistoryLoading);
    const paymentManualLoading = useAppSelector(selectPaymentManualLoading);
    const paymentManualError = useAppSelector(selectPaymentManualError);

    useEffect(() => {
        // dispatch(getRegisteredDevices({username: 'merios'}));
        // dispatch(getPaymentHistory({username: 'merios'}));
    }, [dispatch]);

    return(
        <>
            <Grid>
                <Container maxWidth={"lg"}>
                    <Grid container spacing={2} flexWrap={"nowrap"}>
                        <Grid>
                            <Table component={Paper}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            QR Id
                                        </TableCell>
                                        <TableCell>
                                            Username
                                        </TableCell>
                                        <TableCell>
                                            Name
                                        </TableCell>
                                        <TableCell>
                                            Device Id
                                        </TableCell>
                                        <TableCell>
                                            Address
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {registeredDevicesLoading ?
                                        <TableRow>
                                            <TableCell colSpan={5} sx={{
                                                textAlign: 'center!important',
                                            }}>
                                                <CircularProgress />
                                            </TableCell>
                                        </TableRow>
                                    : (
                                        registeredDevices.map((item)=>(
                                            <TableRow>
                                                <TableCell>
                                                    {item.qrId}
                                                </TableCell>
                                                <TableCell>
                                                    {item.username}
                                                </TableCell>
                                                <TableCell>
                                                    {item.name}
                                                </TableCell>
                                                <TableCell>
                                                    {item.deviceId}
                                                </TableCell>
                                                <TableCell>
                                                    {item.address}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                        )}
                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid>
                            <Table component={Paper}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Transaction Id
                                        </TableCell>
                                        <TableCell>
                                            QR Id
                                        </TableCell>
                                        <TableCell>
                                            Amount
                                        </TableCell>
                                        <TableCell>
                                            Created at
                                        </TableCell>
                                        <TableCell>
                                            Status
                                        </TableCell>
                                        <TableCell>
                                            Payer
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paymentHistoryLoading ?
                                        <TableRow>
                                            <TableCell colSpan={6} sx={{
                                                textAlign: 'center!important',
                                            }}>
                                                <CircularProgress />
                                            </TableCell>
                                        </TableRow>
                                        : (
                                            paymentHistory.map((item)=>(
                                                <TableRow>
                                                    <TableCell>
                                                        {item.transactionId}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.qrId}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.amount}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.createdAt}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.status}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.payer}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </>
    );
};

export default MainPage;