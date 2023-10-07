import { createContext, useContext, useState } from 'react';
import PromptModal, { PromptModalResult } from '../components/PromptModal';
import Modal from '../components/Modal';
import { VirtualKeyboardPosition } from '../components/VirtualKeyboard';

type ModalInputType = 'text' | 'number';

interface ModalOptions {
    label: string;
    inputType?: ModalInputType;
    useVirtualKeyboard?: boolean;
    virtualKeyboardPosition?: VirtualKeyboardPosition;
}

interface ModalOptionsState extends ModalOptions {
    onClose: (result?: PromptModalResult) => void;
}

export interface IPromptModalProvider {
    open: (options: ModalOptions) => Promise<string | number | undefined>;
}

interface PromptModalProviderProps {
    children: any;
}

const PromptModalContext = createContext<IPromptModalProvider | undefined>(undefined);

const PromptModalProvider = (props: PromptModalProviderProps) => {
    const [modalOptions, setModalOptions] = useState<ModalOptionsState | null>(null);

    const open = (options: ModalOptions): Promise<string | number | undefined> => {
        return new Promise((resolve) => {
            setModalOptions({
                ...options,
                onClose: (result?: PromptModalResult) => {
                    setModalOptions(null);
                    resolve(result?.value);
                }
            });
        });
    };

    return (
        <PromptModalContext.Provider value={{ open }}>
            {!!modalOptions && (
                <Modal close={() => setModalOptions(null)} className="prompt-modal">
                    <PromptModal {...(modalOptions as any)} />
                </Modal>
            )}
            {props.children}
        </PromptModalContext.Provider>
    );
};

export default PromptModalProvider;

export const usePromptModal = () => useContext(PromptModalContext)!;
