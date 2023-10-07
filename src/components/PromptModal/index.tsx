import { Button, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import './index.scss';
import { ModalRefPropType } from '../../contexts/ModalContext';
import VirtualKeyboard, { VirtualKeyboardPosition, VirtualKeyboardType } from '../VirtualKeyboard';
import { onlyNumbers } from '../../util/helpers/string.helper';

export interface PromptModalResult {
    value: string | number | undefined;
}

export interface PromptModalProps {
    label: string;
    type?: 'text' | 'number';
    useVirtualKeyboard?: boolean;
    virtualKeyboardPosition?: VirtualKeyboardPosition;
    onClose: (result?: PromptModalResult) => void;
}

const PromptModal = ({
    label,
    type,
    useVirtualKeyboard,
    virtualKeyboardPosition,
    onClose
}: PromptModalProps) => {
    const [value, setValue] = useState<string | number>();

    const virtualKeyboardRef = useRef<VirtualKeyboardType>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        virtualKeyboardRef.current?.handleClose();
        onClose({ value } as PromptModalResult);
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleSetValue = (value: string | number) => {
        setValue(type === 'number' ? onlyNumbers(String(value)) : value);
    };

    return (
        <div id="prompt-modal">
            <div className="form">
                <label>{label}</label>

                <TextField
                    inputRef={inputRef}
                    fullWidth
                    variant="outlined"
                    value={value}
                    onChange={(event) => handleSetValue(event.target.value)}
                    onKeyUp={handleKeyUp}
                />

                {useVirtualKeyboard && (
                    <VirtualKeyboard
                        ref={virtualKeyboardRef}
                        inputRef={inputRef}
                        inputValue={String(value || '')}
                        setInputValue={handleSetValue}
                        position={virtualKeyboardPosition || 'right'}
                    />
                )}
            </div>

            <div className="actions">
                <Button variant="outlined" onClick={() => onClose()}>
                    Cancelar
                </Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Confirmar
                </Button>
            </div>
        </div>
    );
};

export default PromptModal;
