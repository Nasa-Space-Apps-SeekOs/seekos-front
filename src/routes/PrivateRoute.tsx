import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserPermission } from '../util/enums/user-permission';

interface PublicRouteProps {
    children: JSX.Element;
    permissions?: UserPermission[];
}

const PrivateRoute = (props: PublicRouteProps) => {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isLogged()) {
            auth.logout();
            navigate('/login');
        }
    }, []);

    const canRender = auth.hasPermission(props.permissions);

    return canRender ? props.children : <></>;
};

export default PrivateRoute;
