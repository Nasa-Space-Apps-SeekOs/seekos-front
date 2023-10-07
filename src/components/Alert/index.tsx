import { Button } from '@mui/material';
import { ModalRef, ModalRefPropType } from '../../contexts/ModalContext';
import './index.scss';

export interface AlertButton {
    text: string;
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    onClick?: (modalRef: ModalRef) => void;

    /**
     * @default true
     */
    closeOnClick?: boolean;
}

export interface AlertProps extends ModalRefPropType {
    message: string | JSX.Element;
    buttons: AlertButton[];
}

const Alert = (props: AlertProps) => {
    const handleButtonClick = (button: AlertButton) => {
        if (button.closeOnClick === undefined || button.closeOnClick === true)
            props.modalRef.close();

        button.onClick && button.onClick(props.modalRef);
    };

    return (
        <div className="alert">
            <div className="message">{props.message}</div>

            <div className="actions">
                {props.buttons.map((b, i) => (
                    <Button
                        key={i}
                        color={b.color}
                        variant="contained"
                        onClick={() => handleButtonClick(b)}
                    >
                        {b.text}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Alert;
