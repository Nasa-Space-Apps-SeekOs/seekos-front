import { BrowserRouter, Routes as BrowserRoutes, Navigate, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import RepositoryDetail from '../pages/RepositoryDetail';
import PublicRoute from './PublicRoute';
import RepositoryRegister from '../pages/RepositoryRegister';

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

                <Route
                    path="/repository/:id"
                    element={
                        <PublicRoute>
                            <RepositoryDetail />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/repository-register"
                    element={
                        <PublicRoute>
                            <RepositoryRegister />
                        </PublicRoute>
                    }
                />

                <Route path="/" element={<Navigate to="/home" replace />} />
            </BrowserRoutes>
        </BrowserRouter>
    );
};

export default Routes;
