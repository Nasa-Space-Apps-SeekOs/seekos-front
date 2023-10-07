import { createContext, useContext, useState } from 'react';
import Modal from '../components/Modal';
import { v4 as uuidV4 } from 'uuid';

export type ModalRefPropType = {
    modalRef: ModalRef;
};

export interface ModalOptions {
    component: React.FC<any>;
    props?: any;
    className?: string;
    title?: string;
    onClose?: (result?: any) => void;
}

export interface ModalRef {
    id: string;
    component: React.FC<any>;
    props?: any;
    className?: string;
    title?: string;
    close: (result?: any) => void;
}

export interface IModalProvider {
    open: (options: ModalOptions) => ModalRef;
}

interface ModalProviderProps {
    children: JSX.Element;
}

const ModalContext = createContext<IModalProvider | undefined>(undefined);

const ModalProvider = (props: ModalProviderProps) => {
    const [modalList, setModalList] = useState<ModalRef[]>([]);

    const close = (id: string) => {
        setModalList(modalList.filter((modal) => modal.id !== id));
    };

    const open = (options: ModalOptions) => {
        const id = uuidV4();
        const modal: ModalRef = {
            id,
            component: options.component,
            props: options.props,
            className: options.className,
            title: options.title,
            close: (result?: any) => {
                close(id);
                if (options.onClose) options.onClose(result);
            }
        };

        setModalList((ml) => [...ml, modal]);
        return modal;
    };

    return (
        <ModalContext.Provider value={{ open }}>
            {props.children}
            {modalList.map((modal) => (
                <Modal
                    key={modal.id}
                    className={modal.className}
                    close={modal.close}
                    title={modal.title}
                >
                    <modal.component {...modal.props} modalRef={modal} />
                </Modal>
            ))}
        </ModalContext.Provider>
    );
};

export default ModalProvider;

export const useModal = () => useContext(ModalContext)!;
