import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { usePulpReportManualContext } from '../../contexts/PulpReportManualContext';
import './index.scss';
import { useEffect, useRef, useState } from 'react';
import { VirtualKeyboardType } from '../../../../components/VirtualKeyboard';

const PulpReportManualForm = () => {
    const {
        form,
        setFormField,
        save,
        operatorRegistrationValue,
        setOperatorRegistrationValue,
        operator,
        reportParameter,
        getReportByLotNumber
    } = usePulpReportManualContext();

    const registrationInputRef = useRef<HTMLInputElement>(null);
    const registrationVirtualKeyboardRef = useRef<VirtualKeyboardType>(null);

    const [lotNumberSearchValue, setLotNumberSearchValue] = useState<string>('');

    useEffect(() => {
        if (operator) registrationVirtualKeyboardRef.current?.handleClose();
    }, [operator]);

    const handleGetReportByLotNumber = () => {
        if (lotNumberSearchValue) getReportByLotNumber(lotNumberSearchValue);
    };

    const operatorValue = operator ? `${operator?.name}/${operator?.sector}` : '';

    return (
        <div id="report-pulp-manual-form">
            <div className="row">
                <TextField
                    label="Matrícula"
                    variant="standard"
                    value={operatorRegistrationValue}
                    onChange={(e) => setOperatorRegistrationValue(e.target.value)}
                    inputRef={registrationInputRef}
                />

                <TextField label="Operador" variant="standard" disabled value={operatorValue} />

                <TextField
                    label="Estabelecimento"
                    variant="standard"
                    disabled
                    value={reportParameter?.establishmentCode || 0}
                />

                <TextField
                    variant="standard"
                    label="Endereço Impressora - Opcional"
                    value={form.printerAddress}
                    onChange={(e) => setFormField('printerAddress', e.target.value)}
                />

                <TextField
                    variant="standard"
                    label="Busca Lote"
                    value={lotNumberSearchValue}
                    onChange={(e) => setLotNumberSearchValue(e.target.value)}
                    onBlur={handleGetReportByLotNumber}
                />
            </div>

            <div className="row">
                <TextField
                    variant="standard"
                    label="Número da Ordem"
                    type="number"
                    value={form.productionOrderNumber}
                    onChange={(e) => setFormField('productionOrderNumber', e.target.value)}
                />

                <FormControl fullWidth>
                    <InputLabel id="pulp-report-manual-form-port-label">Bico</InputLabel>
                    <Select
                        labelId="pulp-report-manual-form-port-label"
                        id="pulp-report-manual-form-por-select"
                        variant="standard"
                        value={form.port}
                        label="Age"
                        onChange={(e) => setFormField('port', e.target.value)}
                    >
                        {[1, 2].map((value) => (
                            <MenuItem value={value}>{value}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    variant="standard"
                    label="Quantidade"
                    type="number"
                    value={form.reportQuantity}
                    onChange={(e) => setFormField('reportQuantity', e.target.value)}
                />
            </div>

            <div className="row">
                <TextField
                    variant="standard"
                    label="Brix"
                    type="number"
                    value={form.brix}
                    onChange={(e) => setFormField('brix', e.target.value)}
                />

                <TextField
                    variant="standard"
                    label="Cor"
                    type="number"
                    value={form.color}
                    onChange={(e) => setFormField('color', e.target.value)}
                />

                <TextField
                    variant="standard"
                    label="Consistência"
                    type="number"
                    value={form.consistency}
                    onChange={(e) => setFormField('consistency', e.target.value)}
                />

                <TextField
                    variant="standard"
                    label="Acidez"
                    type="number"
                    value={form.acidity}
                    onChange={(e) => setFormField('acidity', e.target.value)}
                />

                <TextField
                    variant="standard"
                    label="pH"
                    type="number"
                    value={form.ph}
                    onChange={(e) => setFormField('ph', e.target.value)}
                />

                <TextField
                    variant="standard"
                    label="Sal Natural"
                    type="number"
                    value={form.naturalSalt}
                    onChange={(e) => setFormField('naturalSalt', e.target.value)}
                />
            </div>

            <div className="row">
                <TextField
                    variant="standard"
                    label="Impurezas"
                    type="number"
                    value={form.impurities}
                    onChange={(e) => setFormField('impurities', e.target.value)}
                />

                <TextField
                    variant="standard"
                    label="Refino"
                    value={form.refining}
                    onChange={(e) => setFormField('refining', e.target.value)}
                />

                <TextField
                    variant="standard"
                    label="Fungos"
                    type="number"
                    value={form.fungus}
                    onChange={(e) => setFormField('fungus', e.target.value)}
                />

                <TextField
                    variant="standard"
                    label="Temperatura"
                    type="number"
                    value={form.temperature}
                    onChange={(e) => setFormField('temperature', e.target.value)}
                />

                <TextField
                    variant="standard"
                    label="Mat. Est. Inseto"
                    type="number"
                    value={form.foreignMatterInsect}
                    onChange={(e) => setFormField('foreignMatterInsect', e.target.value)}
                />

                <TextField
                    variant="standard"
                    label="Mat. Est. Roedor"
                    type="number"
                    value={form.foreignMatterRodent}
                    onChange={(e) => setFormField('foreignMatterRodent', e.target.value)}
                />
            </div>

            <div className="row">
                <TextField
                    variant="standard"
                    label="Especificações (Uso Interno) - Opcional"
                    value={form.specifications}
                    onChange={(e) => setFormField('specifications', e.target.value)}
                />
            </div>

            <div className="row">
                <TextField
                    variant="standard"
                    label="Observações (Etiqueta) - Opcional"
                    value={form.observations}
                    onChange={(e) => setFormField('observations', e.target.value)}
                />
            </div>

            <div className="row actions">
                <Button variant="contained" onClick={save}>
                    Salvar
                </Button>
            </div>
        </div>
    );
};

export default PulpReportManualForm;
