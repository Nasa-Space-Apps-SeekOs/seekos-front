import { Button } from '@mui/material';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLoader } from '../../contexts/LoaderContext';
import './index.scss';
import { UserPermission } from '../../util/enums/user-permission';

const HIDDEN_ON = ['/login'];

const Navbar = () => {
    const location = useLocation();
    const auth = useAuth();
    const navigate = useNavigate();
    const loader = useLoader();

    const [canShow, setCanShow] = useState(true);
    const [currentRoute, setCurrentRoute] = useState(location.pathname);

    const buttons = [
        auth.hasPermission([UserPermission.PULP_REPORT]) && {
            path: '/pulp-report',
            label: 'Reporte de Polpa'
        },
        auth.hasPermission([UserPermission.PULP_REPORT_MANUAL]) && {
            path: '/pulp-report-manual',
            label: 'Reporte Manual'
        },
        auth.hasPermission([UserPermission.REPORT_PARAMETERS]) && {
            path: '/report-parameters',
            label: 'Parâmetros de Reporte'
        },
        auth.hasPermission([UserPermission.CQ_RANGES]) && { path: '/cq-ranges', label: 'Faixas CQ' }
    ];

    useEffect(() => {
        setCurrentRoute(location.pathname);
        setCanShow(!HIDDEN_ON.includes(location.pathname));
    }, [location]);

    const handleLogout = () => {
        loader.show();
        auth.logout().then(() => {
            loader.hide();
            navigate('/login');
        });
    };

    const buttonsToShow = buttons.filter(Boolean) as { path: string; label: string }[];

    return canShow ? (
        <div id="navbar">
            <nav>
                <span className="nav-title">Reporte de Polpa</span>

                <div className="content">
                    <div className="buttons">
                        {buttonsToShow.map((b, i) => (
                            <Link
                                key={i}
                                to={b.path}
                                className={classNames({
                                    item: true,
                                    active: currentRoute === b.path
                                })}
                            >
                                {b.label}
                            </Link>
                        ))}
                    </div>
                    <div className="right">
                        <Button onClick={handleLogout} className="button-logout" variant="text">
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>
        </div>
    ) : (
        <div />
    );
};

export default Navbar;
