import { BrowserRouter, Navigate, Route, Routes as BrowserRoutes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ENV } from '../env';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PulpReport from '../pages/PulpReport';
import ReportParameters from '../pages/ReportParameters';
import CqRanges from '../pages/CqRanges';
import { UserPermission } from '../util/enums/user-permission';
import PulpReportManual from '../pages/PulpReportManual';

const Routes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <BrowserRoutes>
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/pulp-report"
                    element={
                        <PrivateRoute permissions={[UserPermission.PULP_REPORT]}>
                            <PulpReport />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/pulp-report-manual"
                    element={
                        <PrivateRoute permissions={[UserPermission.PULP_REPORT_MANUAL]}>
                            <PulpReportManual />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/report-parameters"
                    element={
                        <PrivateRoute permissions={[UserPermission.REPORT_PARAMETERS]}>
                            <ReportParameters />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/cq-ranges"
                    element={
                        <PrivateRoute permissions={[UserPermission.CQ_RANGES]}>
                            <CqRanges />
                        </PrivateRoute>
                    }
                />

                <Route path="/" element={<Navigate to="/login" replace />} />
            </BrowserRoutes>
        </BrowserRouter>
    );
};

export default Routes;
