import { Button } from '@mui/material';
import './index.scss';
import { useCqRangesContext } from '../../contexts/CqRangesContext';
import CqRangeFormItem from './components/CqRangeFormItem';

const CqRangesForm = () => {
    const { form, setFormField, save, labels } = useCqRangesContext();

    const formItems = Object.entries(form).map(([key, value]) => (
        <CqRangeFormItem
            key={`form-item-${key}`}
            className="form-field-item"
            label={labels[key as keyof typeof labels]}
            value={value}
            onChange={(value) => setFormField(key as any, value)}
        />
    ));

    return (
        <div id="cq-ranges-form">
            <div className="form-fields">{formItems}</div>

            <div className="actions">
                <Button variant="contained" onClick={save}>
                    Salvar
                </Button>
            </div>
        </div>
    );
};

export default CqRangesForm;
