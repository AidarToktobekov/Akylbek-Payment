import {Button, CircularProgress, Container, Grid, MenuItem, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import {
    selectPaymentHistory,
    selectPaymentHistoryLoading,
    selectPaymentManualLoading,
    selectRegisteredDevices,
    selectRegisteredDevicesLoading
} from "../../features/payments/paymentsSlice.js";
import React, {useEffect, useState} from "react";
import {createPaymentManual, getPaymentHistory, getRegisteredDevices} from "../../features/payments/paymentsThunk.js";
import {selectUser} from "../../features/user/userSlice.js";
import dayjs from "dayjs";

const MainPage = ()=>{

    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const registeredDevices = useAppSelector(selectRegisteredDevices);
    const registeredDevicesLoading = useAppSelector(selectRegisteredDevicesLoading);
    const paymentHistory = useAppSelector(selectPaymentHistory);
    const paymentHistoryLoading = useAppSelector(selectPaymentHistoryLoading);
    const paymentManualLoading = useAppSelector(selectPaymentManualLoading);

    const [state, setState] = useState({
        qrId: '',
        amount: 0,
        transactionId: '',
    })

    useEffect(() => {
        dispatch(getRegisteredDevices({username: user.username}));
        dispatch(getPaymentHistory({username: user.username}));
    }, [dispatch]);

    const handleChangeInput = (e)=>{
        const { name, value } = e.target;

        setState((prev)=>({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const paymentMutation = {
                qrId: state.qrId.trim(),
                amount: state.amount,
                transactionId: new Date().getTime(),
            }
            await dispatch(createPaymentManual(paymentMutation));
        }catch(e){
            console.log(e);
        }
    }

    return(
        <>
            <Grid py={4}>
                <Container maxWidth={"lg"}>
                    <Grid mb={3} sx={{
                        backgroundColor: '#444',
                        p: 4,
                        borderRadius: '10px'
                    }}
                    >
                        <Typography component={'h3'} sx={{
                            color: 'white',
                            fontSize: "28px",
                            marginBottom: '15px',
                            textAlign: 'center',
                            "@media (max-width: 500px)": {
                                fontSize: '20px',
                            }
                        }}>
                            Ручной платеж
                        </Typography>
                        <Grid component={"form"} onSubmit={handleSubmit}>
                            <Grid container spacing={2} sx={{
                                "@media (max-width: 500px)": {
                                    flexWrap: 'wrap'
                                }
                            }}>
                                <Grid sx={{
                                    width: 'calc(50% - 8px)',
                                    "@media (max-width: 500px)": {
                                        width: '100%',
                                    }
                                }}
                                >
                                    <TextField required fullWidth type={'text'} select label={"QR Id"} name={"qrId"} value={state.qrId} onChange={handleChangeInput} sx={{
                                        '& label': {
                                            color: '#fff',
                                        },
                                        '& label.Mui-focused': {
                                            color: '#90caf9',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#fff', // default border
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#90caf9', // on hover
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1976d2', // when focused
                                            },
                                        },
                                        '& .MuiInputBase-input': {
                                            color: '#fff',
                                        },
                                    }}>
                                        {registeredDevicesLoading ? (
                                            <MenuItem value={''} sx={{
                                                textAlign: 'center',
                                            }}>
                                                <CircularProgress/>
                                            </MenuItem>
                                        ) : (
                                            registeredDevices.map((item)=>(
                                                <MenuItem value={item.qrId}>
                                                    {item.qrId}
                                                </MenuItem>
                                            ))
                                        )}
                                    </TextField>
                                </Grid>
                                <Grid sx={{
                                    width: 'calc(50% - 8px)',
                                    "@media (max-width: 500px)": {
                                        width: '100%',
                                    }
                                }}>
                                    <TextField required fullWidth type={'number'} inputProps={{min: 0}} label={"Сумма"} value={state.amount} name={"amount"} onChange={handleChangeInput} sx={{
                                            '& label': {
                                                color: '#fff',
                                            },
                                            '& label.Mui-focused': {
                                                color: '#90caf9',
                                            },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#fff', // default border
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#90caf9', // on hover
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1976d2', // when focused
                                            },
                                        },
                                        '& .MuiInputBase-input': {
                                            color: '#fff',
                                        },
                                    }}/>
                                </Grid>
                            </Grid>
                            <Button type={"submit"} variant={'contained'} loading={paymentManualLoading} sx={{
                                width: '100%',
                                mt: 2,
                                fontSize: '20px',
                                backgroundColor: '#fff',
                                color: '#444',
                                "@media (max-width: 500px)": {
                                    fontSize: '16px',
                                }
                            }}>
                                Оплатить
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{
                        flexWrap: 'nowrap',
                        "@media (max-width: 900px)": {
                            flexWrap: 'wrap',
                        }
                    }}
                    >
                        <Grid container flexDirection={"column"} justifyContent={'space-between'} sx={{
                            flexGrow: 1,
                            borderRadius: '10px',
                            backgroundColor: "#444",
                            p: 2,
                        }}>
                            <Typography variant={"h3"} sx={{
                                fontSize: '28px',
                                color: 'white',
                                mb: 1,
                                "@media (max-width: 500px)": {
                                    fontSize: '20px',
                                }
                            }}>
                                Зарегистрированные устройства
                            </Typography>
                            <Grid sx={{
                                maxHeight: '300px',
                                overflowY: 'auto',
                                "& > div":{
                                    mt: 1,
                                },
                            }}>
                            {registeredDevicesLoading ?
                                    <Grid sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: "center",
                                    }}>
                                        <CircularProgress />
                                    </Grid>
                                : (
                                    registeredDevices.map((item)=>(
                                        <Grid container spacing={1} flexDirection={"column"} key={item.id} sx={{
                                            background: "#f1f1f1",
                                            fontFamily: 'Roboto, sans-serif',
                                            p: 1,
                                            borderRadius: '5px',
                                            border: "1px solid #fff",
                                            color: '#ffffff',
                                            "& > div": {
                                                display: "flex",
                                            },
                                            "@media (max-width: 500px)": {
                                                fontSize: '12px',
                                            },
                                            "& > div > div": {
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                textAlign: "center",
                                            },
                                        }}>
                                            <Grid>
                                                <Grid sx={{
                                                    width: '35%',
                                                    backgroundColor: 'rgba(32,48,90,0.7)',
                                                    p: 1,
                                                    borderRadius: '5px 0 0 5px',
                                                }}>
                                                    QR Id
                                                </Grid>
                                                <Grid sx={{
                                                    width: '65%',
                                                    borderRadius: '0 5px 5px 0',
                                                    backgroundColor: '#655566',
                                                    p: 1,
                                                }}>
                                                    {item.qrId}
                                                </Grid>
                                            </Grid>
                                            <Grid>
                                                <Grid sx={{
                                                    width: '35%',
                                                    backgroundColor: 'rgba(32,48,90,0.7)',
                                                    p: 1,
                                                    borderRadius: '5px 0 0 5px',
                                                }}>
                                                    Id устройства
                                                </Grid>
                                                <Grid sx={{
                                                    width: '65%',
                                                    backgroundColor: '#655566',
                                                    p: 1,
                                                    borderRadius: '0 5px 5px 0',
                                                }}>
                                                    {item.deviceId}
                                                </Grid>
                                            </Grid>
                                            <Grid>
                                                <Grid sx={{
                                                    width: '35%',
                                                    backgroundColor: 'rgba(32,48,90,0.7)',
                                                    p: 1,
                                                    borderRadius: '5px 0 0 5px',
                                                }}>
                                                    Адрес
                                                </Grid>
                                                <Grid sx={{
                                                    width: '65%',
                                                    borderRadius: '0 5px 5px 0',
                                                    backgroundColor: '#655566',
                                                    p: 1,
                                                }}>
                                                    {item.address}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    ))
                                )}
                            </Grid>
                        </Grid>
                        <Grid container flexDirection={"column"} justifyContent={'space-between'} sx={{
                            flexGrow: 1,
                            borderRadius: '10px',
                            backgroundColor: "#444",
                            p: 2,
                        }}>
                            <Typography variant={"h3"} sx={{
                                fontSize: '28px',
                                color: 'white',
                                mb: 1,
                                "@media (max-width: 500px)": {
                                    fontSize: '20px',
                                }
                            }}>
                                История платежей
                            </Typography>
                            <Grid sx={{
                                maxHeight: '300px',
                                overflowY: 'auto',
                                "& > div":{
                                    mt: 1,
                                }
                            }}>
                            {paymentHistoryLoading ?
                                <Grid sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: "center",
                                }}>
                                    <CircularProgress />
                                </Grid>
                                : (
                                    paymentHistory.map((item)=>(
                                        <Grid container spacing={1} flexDirection={"column"} key={item.id} sx={{
                                            background: "#f1f1f1",
                                            fontFamily: 'Roboto, sans-serif',
                                            p: 1,
                                            borderRadius: '5px',
                                            border: "1px solid #fff",
                                            color: '#ffffff',
                                            "& > div": {
                                                display: "flex",
                                            },
                                            "@media (max-width: 500px)": {
                                                fontSize: '12px',
                                            },
                                            "& > div > div": {
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                textAlign: "center",
                                            },
                                        }}
                                        >
                                            <Grid>
                                                <Grid sx={{
                                                    width: '35%',
                                                    backgroundColor: 'rgba(32,48,90,0.7)',
                                                    p: 1,
                                                    borderRadius: '5px 0 0 5px',
                                                }}>
                                                    Сумма
                                                </Grid>
                                                <Grid sx={{
                                                    width: '65%',
                                                    borderRadius: '0 5px 5px 0',
                                                    backgroundColor: '#655566',
                                                    p: 1,
                                                }}>
                                                    {item.amount}сом
                                                </Grid>
                                            </Grid>
                                            <Grid>
                                                <Grid sx={{
                                                    width: '35%',
                                                    backgroundColor: 'rgba(32,48,90,0.7)',
                                                    p: 1,
                                                    borderRadius: '5px 0 0 5px',
                                                }}>
                                                    Дата
                                                </Grid>
                                                <Grid sx={{
                                                    width: '65%',
                                                    backgroundColor: '#655566',
                                                    p: 1,
                                                    borderRadius: '0 5px 5px 0',
                                                }}>
                                                    {dayjs(item.createdAt).format("YY-MM-DD HH:mm:ss")}
                                                </Grid>
                                            </Grid>
                                            <Grid>
                                                <Grid sx={{
                                                    width: '35%',
                                                    backgroundColor: 'rgba(32,48,90,0.7)',
                                                    p: 1,
                                                    borderRadius: '5px 0 0 5px',
                                                }}>
                                                    Статус
                                                </Grid>
                                                <Grid sx={{
                                                    width: '65%',
                                                    borderRadius: '0 5px 5px 0',
                                                    backgroundColor: '#655566',
                                                    p: 1,
                                                }}>
                                                    {item.status}
                                                </Grid>
                                            </Grid>
                                            <Grid>
                                                <Grid sx={{
                                                    width: '35%',
                                                    backgroundColor: 'rgba(32,48,90,0.7)',
                                                    p: 1,
                                                    borderRadius: '5px 0 0 5px',
                                                }}>
                                                    Плательщик
                                                </Grid>
                                                <Grid sx={{
                                                    width: '65%',
                                                    borderRadius: '0 5px 5px 0',
                                                    backgroundColor: '#655566',
                                                    p: 1,
                                                }}>
                                                    {item.payer}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    ))
                                )}
                                </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </>
    );
};

export default MainPage;