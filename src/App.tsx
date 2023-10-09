import { ThemeProvider } from '@mui/material';
import ProviderComposer from './components/ProviderComposer';
import AlertProvider from './contexts/AlertContext';
import AuthProvider from './contexts/AuthContext';
import LoaderProvider from './contexts/LoaderContext';
import ModalProvider from './contexts/ModalContext';
import ToastProvider from './contexts/ToastContext';
import Routes from './routes/Routes';
import { theme } from './styles/mui-theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PromptModalProvider from './contexts/PromptModalContext';

const App = () => {
    return (
        <div id="app">
            <ProviderComposer
                components={[
                    { Component: LocalizationProvider, props: { dateAdapter: AdapterDayjs } },
                    { Component: ThemeProvider, props: { theme } },
                    { Component: AuthProvider },
                    { Component: LoaderProvider },
                    { Component: ToastProvider },
                    { Component: AlertProvider },
                    { Component: PromptModalProvider },
                    { Component: ModalProvider }
                ]}
            >
                <Routes />
            </ProviderComposer>
        </div>
    );
};

export default App;
