import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './index.scss';
import classNames from 'classnames';
import { Button } from '@mui/material';
import { Close } from '@mui/icons-material';
import Draggable from 'react-draggable';

export type VirtualKeyboardPosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'top-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'left'
    | 'right';

export interface VirtualKeyboardType {
    handleClose: () => void;
}

interface KeyItem {
    label: string;
    value?: string | number;
    action?: () => void;
}

interface VirtualKeyboardProps {
    inputRef: React.MutableRefObject<HTMLInputElement | null>;
    setInputValue: (value: string) => void;
    inputValue: string | undefined;
    position?: VirtualKeyboardPosition;
}

const VirtualKeyboard = forwardRef(
    ({ inputRef, setInputValue, inputValue, position }: VirtualKeyboardProps, ref) => {
        const keysRows: KeyItem[][] = [
            [
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' }
            ],
            [
                { label: '4', value: '4' },
                { label: '5', value: '5' },
                { label: '6', value: '6' }
            ],
            [
                { label: '7', value: '7' },
                { label: '8', value: '8' },
                { label: '9', value: '9' }
            ],
            [
                { label: ',', value: '.' },
                { label: '0', value: '0' }
            ],
            [
                {
                    label: 'Limpar',
                    action: () => setInputValue('')
                },
                {
                    label: '<- Apagar',
                    action: () => setInputValue(inputValue?.slice(0, -1) ?? '')
                }
            ]
        ];

        const [isOpen, setIsOpen] = useState(false);

        useEffect(() => {
            inputRef.current?.addEventListener('focusin', handleFocusIn);

            return () => {
                inputRef.current?.removeEventListener('focusin', handleFocusIn);
            };
        }, []);

        useImperativeHandle(ref, () => ({
            handleClose: handleClose
        }));

        const handleFocusIn = () => {
            setIsOpen(true);
        };

        const handleClose = () => {
            setIsOpen(false);
        };

        const handleKeyClick = (
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            key: KeyItem
        ) => {
            if (key.value !== undefined) {
                console.log(inputValue)
                setInputValue((inputValue || '') + key.value);
                inputRef.current?.focus();
                return;
            }

            if (key.action) {
                key.action();
            }
        };

        const keyboardPosition: VirtualKeyboardPosition = position || 'bottom-center';

        return isOpen ? (
            <Draggable defaultClassName={classNames('virtual-keyboard', keyboardPosition)}>
                <div className="board">
                    <div className="board-header">
                        <Button variant="contained" className="button-close" onClick={handleClose}>
                            <Close />
                        </Button>
                    </div>

                    {keysRows.map((row, i) => (
                        <div key={i} className="board-row">
                            {row.map((key, j) => (
                                <div key={j} className="board-row-key">
                                    <Button
                                        onClick={(e) => handleKeyClick(e, key)}
                                        variant="outlined"
                                    >
                                        {key.label}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </Draggable>
        ) : (
            <></>
        );
    }
);

export default VirtualKeyboard;
