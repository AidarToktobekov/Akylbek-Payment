import {Button, Container, Grid, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.js";
import {createPaymentManual} from "../../features/payments/paymentsThunk.js";

const PaymentManual = ()=>{

    const dispatch = useAppDispatch();

    const [state, setState] = useState({
        qrId: "",
        amount: 0,
        transactionId: ""
    });

    const inputChangeHandler = (e)=>{
        const { name, value } = e.target;

        setState(prev=>({
            ...prev,
            [name]: value,
        }));
    };

    const submitFormHandler = async (event) => {
        event.preventDefault();

        await dispatch(createPaymentManual(state));
    }

    return(
        <>
            <Grid>
                <Container maxWidth={"lg"}>
                    <Typography>
                        Руководство по оплате
                    </Typography>
                    <Grid component={"form"} container flexDirection={"column"} onSubmit={submitFormHandler} spacing={2} sx={{
                        maxWidth: "400px",
                    }}>
                        <TextField name={"qrId"} type={"text"} onChange={inputChangeHandler}/>
                        <TextField name={"amount"} type={"number"} min={0} onChange={inputChangeHandler}/>
                        <TextField name={"transactionId"} type={"text"} onChange={inputChangeHandler}/>
                        <Button type={"submit"} variant="contained" color={"primary"}>
                            Сохранить
                        </Button>
                    </Grid>
                </Container>
            </Grid>
        </>
    );
};

export default PaymentManual;