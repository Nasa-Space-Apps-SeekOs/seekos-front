import './index.scss';
import { Button, Card, CardActions, CardContent, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLoader } from '../../contexts/LoaderContext';
import { useToast } from '../../contexts/ToastContext';
import { ReactComponent as LogoOderich } from '../../assets/logo-oderich-black.svg';
import { mapHttpError } from '../../util/helpers/http-error';
import VirtualKeyboard, { VirtualKeyboardType } from '../../components/VirtualKeyboard';

const Login = () => {
    const auth = useAuth();
    const loader = useLoader();
    const toast = useToast();
    const navigate = useNavigate();

    const usernameInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const usernameVirtualKeyboardRef = useRef<VirtualKeyboardType>(null);
    const passwordVirtualKeyboardRef = useRef<VirtualKeyboardType>(null);

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    });

    const canLogin = !!loginForm.username;

    const handleLogin = () => {
        usernameVirtualKeyboardRef.current?.handleClose();
        passwordVirtualKeyboardRef.current?.handleClose();

        loader.show();
        auth.login({
            username: loginForm.username,
            password: loginForm.password
        })
            .then(() => {
                loader.hide();
                navigate('/pulp-report');
            })
            .catch((error) => {
                loader.hide();
                toast.show(mapHttpError(error), 'error');
            });
    };

    const setFieldValue = (field: string, value: any) => {
        setLoginForm((f) => ({
            ...f,
            [field]: value
        }));
    };

    return (
        <div id="login">
            <Card className="card">
                <CardContent className="card-content">
                    <LogoOderich className="logo" />

                    <div className="card-title">Login</div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}
                    >
                        <TextField
                            inputRef={usernameInputRef}
                            label="Usuário"
                            variant="outlined"
                            value={loginForm.username}
                            onChange={(e) => setFieldValue('username', e.target.value)}
                            onFocus={() => passwordVirtualKeyboardRef.current?.handleClose()}
                        />

                        <VirtualKeyboard
                            ref={usernameVirtualKeyboardRef}
                            inputRef={usernameInputRef}
                            inputValue={loginForm.username}
                            setInputValue={(value) => setFieldValue('username', value)}
                            position='right'
                        />

                        <TextField
                            inputRef={passwordInputRef}
                            label="Senha"
                            variant="outlined"
                            value={loginForm.password}
                            type="password"
                            onChange={(e) => setFieldValue('password', e.target.value)}
                            onFocus={() => usernameVirtualKeyboardRef.current?.handleClose()}
                        />

                        <VirtualKeyboard
                            ref={passwordVirtualKeyboardRef}
                            inputRef={passwordInputRef}
                            inputValue={loginForm.password}
                            setInputValue={(value) => setFieldValue('password', value)}
                            position='right'
                        />
                    </form>
                </CardContent>
                <CardActions className="card-actions">
                    <Button
                        variant="contained"
                        className="btn-login"
                        disabled={!canLogin}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default Login;
