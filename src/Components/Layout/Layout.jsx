// import AppToolbar from '../AppToolbar/AppToolbar.jsx';
import {Container,} from '@mui/material';
import {useLocation} from 'react-router-dom';
import AppToolbar from "../AppToolbar/AppToolbar.jsx";

const Layout = ({ children }) => {
    const location = useLocation();

    return (
        <>
            <header>{location.pathname === "/sign-in" || location.pathname === "/sign-up" ? <></> : <AppToolbar />}</header>
            <Container
                maxWidth={false}
                component="main"
                disableGutters
                sx={{ minHeight: '80vh' }}
            >
                {children}
            </Container>
            <footer>
            </footer>
        </>
    );
};

export default Layout;
