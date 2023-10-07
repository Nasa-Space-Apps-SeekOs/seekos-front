import { TextField } from '@mui/material';
import './index.scss';
import classNames from 'classnames';

interface CqRangeFormItemProps {
    label: string;
    value: [number, number];
    onChange: (value: [number, number]) => void;
    className?: string;
}

const CqRangeFormItem = ({ label, value, onChange, className }: CqRangeFormItemProps) => {
    return (
        <div className={classNames('cq-range-form-item', className)}>
            <label>{label}</label>

            <div className="fields">
                <TextField
                    variant="standard"
                    helperText="Min"
                    type="number"
                    value={value[0]}
                    onChange={(e) => onChange([Number(e.target.value), value[1]])}
                />
                <TextField
                    variant="standard"
                    helperText="Max"
                    type="number"
                    value={value[1]}
                    onChange={(e) => onChange([value[0], Number(e.target.value)])}
                />
            </div>
        </div>
    );
};

export default CqRangeFormItem;
