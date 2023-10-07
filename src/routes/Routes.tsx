import { BrowserRouter, Navigate, Route, Routes as BrowserRoutes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PublicRoute from './PublicRoute';
import Home from '../pages/Home';

const Routes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <BrowserRoutes>
                {/* <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                /> */}

                {/* <Route
                    path="/pulp-report"
                    element={
                        <PrivateRoute permissions={[UserPermission.PULP_REPORT]}>
                            <PulpReport />
                        </PrivateRoute>
                    }
                /> */}

                <Route
                    path="/home"
                    element={
                        <PublicRoute>
                            <Home />
                        </PublicRoute>
                    }
                />

                <Route path="/" element={<Navigate to="/home" replace />} />
            </BrowserRoutes>
        </BrowserRouter>
    );
};

export default Routes;
