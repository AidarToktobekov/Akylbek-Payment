import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Typography } from '@mui/material';
import UserRegister from "./Containers/User/UserRegister.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import UserLogin from "./Containers/User/UserLogin.jsx";
import ProtectedRoute from "./Components/ProtactedRoute/ProtectedRoute.jsx";
import PaymentManual from "./Containers/PaymentManual/PaymentManual.jsx";
import {useAppSelector} from "./app/hooks.js";
import {selectUser} from "./features/user/userSlice.js";

function App() {

    const user = useAppSelector(selectUser);

  return (
      <>
        <Layout>
          <Routes>
            <Route
                path="/"
                element={
                  <>
                  </>
                }
            />
            <Route
                path="/sign-in"
                element={
                  <>
                    <UserLogin></UserLogin>
                  </>
                }
            />
            <Route
                path="/sign-up"
                element={
                  <>
                    <UserRegister></UserRegister>
                  </>
                }
            />
              <Route
                  path="/payment_manual"
                  element={
                      <>
                          <ProtectedRoute isAllowed={user}>
                              <PaymentManual/>
                          </ProtectedRoute>
                      </>
                  }
              />
              <Route
                  path="*"
                  element={
                      <Typography
                          variant={'h1'}
                          sx={{
                              textAlign: 'center',
                              margin: '20px 0',
                          }}
                      >
                          Not found
                      </Typography>
                  }
              />
          </Routes>
        </Layout>
      </>
  );
}

export default App;
