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
        {
            path: '/repository-register',
            label: 'Create new repository'
        }
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

    const logo = require('../../assets/logo-seekos.png');

    return canShow ? (
        <div id="navbar">
            <nav>
                <Link to="/" className="nav-title">
                    <img src={logo} alt="Logo" />
                    <span>SeekOs</span>
                </Link>

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
                        {/* <Button onClick={handleLogout} className="button-logout" variant="text">
                            Logout
                        </Button> */}
                    </div>
                </div>
            </nav>
        </div>
    ) : (
        <div />
    );
};

export default Navbar;
