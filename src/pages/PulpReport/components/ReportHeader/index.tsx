import dayjs from 'dayjs';
import './index.scss';
import { usePulpReportContext } from '../../contexts/PulpReportContext';
import { Button, FormControl, InputLabel, TextField } from '@mui/material';
import colors from '../../../../styles/colors.scss';
import { useEffect, useRef } from 'react';
import VirtualKeyboard, { VirtualKeyboardType } from '../../../../components/VirtualKeyboard';

interface HeaderItemOptions {
    label: string;
    value: string;
    color: string;
}

const ReportHeader = () => {
    const { operatorRegistrationValue, setOperatorRegistrationValue, operator } =
        usePulpReportContext();

    const registrationInputRef = useRef<HTMLInputElement>(null);
    const registrationVirtualKeyboardRef = useRef<VirtualKeyboardType>(null);

    useEffect(() => {
        if (operator) registrationVirtualKeyboardRef.current?.handleClose();
    }, [operator]);

    const renderHeaderItem = (options: HeaderItemOptions) => {
        return (
            <div className="header-item" style={{ backgroundColor: options.color }}>
                <label>{options.label}</label>
                <span>{options.value}</span>
            </div>
        );
    };

    const date = dayjs().format('DD/MM/YYYY');

    return (
        <div id="report-header">
            {renderHeaderItem({
                label: 'Data',
                value: date,
                color: colors['color-peterriver']
            })}

            <div className="field-wrapper">
                <label>Matrícula</label>
                <TextField
                    className="field"
                    variant="outlined"
                    value={operatorRegistrationValue}
                    onChange={(e) => setOperatorRegistrationValue(e.target.value)}
                    inputRef={registrationInputRef}
                />
            </div>

            {operator &&
                renderHeaderItem({
                    label: 'Nome/Setor',
                    value: `${operator?.name}/${operator?.sector}`,
                    color: colors['color-peterriver']
                })}

            <VirtualKeyboard
                ref={registrationVirtualKeyboardRef}
                inputRef={registrationInputRef}
                inputValue={operatorRegistrationValue}
                setInputValue={setOperatorRegistrationValue}
            />
        </div>
    );
};

export default ReportHeader;
