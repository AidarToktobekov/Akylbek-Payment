import React, {useState} from 'react';
import {Box, Button, Grid, Stack, TextField, Typography,} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from "../../app/hooks.js";
import {register} from "../../features/user/userThunk.js"

const UserRegister = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = false;
    const [state, setState] = useState({
        username: '',
        name: '',
        phoneNumber: '',
        businessType: '',
        address: '',
        password: '',
    });

    const inputChangeHandler = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitFormHandler = async (event) => {
        event.preventDefault();
        try {
            const userMutation = {
                username: state.username.trim(),
                name: state.name.trim(),
                phoneNumber: state.phoneNumber.trim(),
                businessType: state.businessType,
                address: state.address.trim(),
                password: state.password.trim(),
            };

            await dispatch(register(userMutation)).unwrap();
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Stack sx={{ width: '100%' }} textAlign="center">
            <Stack alignItems="center" justifyContent="center" m={4}>
                <Box
                    sx={{
                        mt: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: '500px',
                        width: '100%',
                    }}
                >
                    <Typography component="h1" variant="h5" gutterBottom>
                        Регистрация
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={submitFormHandler}
                        sx={{
                            mt: 3,
                            width: '100%',
                            mx: 'auto',
                        }}
                    >
                        <Grid container direction="column" spacing={2}>
                            <Grid>
                                <TextField
                                    required
                                    type="text"
                                    label="Логин"
                                    name="username"
                                    autoComplete="new-username"
                                    value={state.username}
                                    onChange={inputChangeHandler}
                                    sx={{
                                        width: '100%',
                                    }}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    required
                                    type="text"
                                    label="ФИО"
                                    name="name"
                                    autoComplete="new-name"
                                    value={state.name}
                                    onChange={inputChangeHandler}
                                    sx={{
                                        width: '100%',
                                    }}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    required
                                    type="text"
                                    label="Адрес"
                                    name="address"
                                    autoComplete="new-address"
                                    value={state.address}
                                    onChange={inputChangeHandler}
                                    sx={{
                                        width: '100%',
                                    }}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    required
                                    type="text"
                                    label="Тип бизнеса"
                                    name="businessType"
                                    autoComplete="new-businessType"
                                    value={state.businessType}
                                    onChange={inputChangeHandler}
                                    sx={{
                                        width: '100%',
                                    }}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    required
                                    type="tel"
                                    label="Номер телефона"
                                    name="phoneNumber"
                                    autoComplete="new-phoneNumber"
                                    value={state.phoneNumber}
                                    onChange={inputChangeHandler}
                                    sx={{
                                        width: '100%',
                                    }}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    required
                                    type="password"
                                    label="Пароль"
                                    name="password"
                                    autoComplete="new-password"
                                    value={state.password}
                                    onChange={inputChangeHandler}
                                    sx={{
                                        width: '100%',
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                            }}
                            loading={loading}
                        >
                            Сохранить
                        </Button>
                    </Box>
                </Box>
            </Stack>
        </Stack>
    );
};

export default UserRegister;
