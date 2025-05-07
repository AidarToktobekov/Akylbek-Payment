import {
    AppBar,
    Box,
    Button,
    Toolbar,
    Typography,
} from '@mui/material';
import {
    logout,
    selectUser,
} from '../../features/user/userSlice.js';
import {  useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.js';

const AppToolbar = () => {
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/sign-in');
    };
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{
                    backgroundColor: '#444',
                }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {user?.username}
                        </Typography>

                        <Button onClick={handleLogout} variant={'contained'} color={"error"}>Выйти</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
};

export default AppToolbar;
