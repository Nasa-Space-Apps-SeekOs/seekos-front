import { Close } from '@mui/icons-material';
import { IconButton, Modal as MuiModal } from '@mui/material';
import './index.scss';

export interface ModalProps {
    title?: string;
    className?: string;
    close?: (result?: any) => void;
    children: JSX.Element;
    hideCloseButton?: boolean;
}

const Modal = (props: ModalProps) => {
    return (
        <MuiModal open={true} onClose={props.close} className="modal">
            <div className={`modal-box${props.className ? ' ' + props.className : ''}`}>
                <div className="header">
                    <div className="modal-title">{props.title}</div>
                    {!props.hideCloseButton && (
                        <IconButton className="btn-close" onClick={props.close}>
                            <Close />
                        </IconButton>
                    )}
                </div>
                <div className="modal-content">{props.children}</div>
            </div>
        </MuiModal>
    );
};

export default Modal;
