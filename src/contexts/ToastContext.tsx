import { createContext, useContext } from 'react';
import { toast, ToastContainer, ToastPosition, TypeOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TOAST_DURATION = 5000;
const TOAST_POSITION: ToastPosition = 'top-right';

export interface IToastProvider {
    show: (message: string, type?: TypeOptions) => void;
    // showHttpError: (error: any) => void;
}

interface ToastProviderProps {
    children: JSX.Element;
}

const ToastContext = createContext<IToastProvider | undefined>(undefined);

const ToastProvider = (props: ToastProviderProps) => {
    // const [isShowing, setIsShowing] = useState(false);

    const show = (message: string, type: TypeOptions = 'info') => {
        toast(message, {
            autoClose: TOAST_DURATION,
            position: TOAST_POSITION,
            type
        });
    };

    // const showHttpError = (error: any) => {
    //     show(t(`apiErrors.${HttpHelper.mapErrorResponse(error).message}`), 'error');
    // };

    return (
        <ToastContext.Provider
            value={{
                show
                // showHttpError
            }}
        >
            {props.children}
            <ToastContainer />
        </ToastContext.Provider>
    );
};

export default ToastProvider;

export const useToast = () => useContext(ToastContext)!;
