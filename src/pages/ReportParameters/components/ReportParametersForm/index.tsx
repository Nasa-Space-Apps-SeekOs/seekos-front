import {
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField
} from '@mui/material';
import { useReportParametersContext } from '../../contexts/ReportParametersContext';
import './index.scss';
import dayjs from 'dayjs';
import FormOrders from './components/FormOrders';

const ReportParametersForm = () => {
    const { form, setFormField, save, cqRange, parameter, selectedProductionOrder } =
        useReportParametersContext();

    const updatedAt = dayjs(parameter?.updatedAt).format('DD/MM/YYYY HH:mm');

    const type = selectedProductionOrder?.itemCode.slice(-1) ?? parameter?.type;

    return (
        <div id="report-parameters-form">
            <div className="row">
                <TextField
                    variant="standard"
                    label="Estabelecimento"
                    value={parameter?.establishmentCode ?? ''}
                    disabled
                />

                <TextField
                    variant="standard"
                    label="Última atualização"
                    value={updatedAt}
                    disabled
                />
            </div>

            <div className="row">
                <TextField variant="standard" label="Tipo" value={type ?? ''} disabled />

                <TextField
                    variant="standard"
                    label="Endereço Impressora"
                    value={form.printerAddress}
                    onChange={(e) => setFormField('printerAddress', e.target.value)}
                />

                <TextField
                    variant="standard"
                    type="number"
                    label="Delay Reporte com Balança"
                    value={form.scaleDelayToReport}
                    onChange={(e) => setFormField('scaleDelayToReport', e.target.value)}
                />

                <FormControlLabel
                    control={
                        <Switch
                            checked={form.useScale}
                            onChange={(e) => setFormField('useScale', e.target.checked)}
                        />
                    }
                    label="Habilitar Balança"
                />
            </div>

            <div className="row">
                <TextField
                    variant="standard"
                    label="Brix"
                    type="number"
                    value={form.brix}
                    onChange={(e) => setFormField('brix', e.target.value)}
                    helperText={cqRange ? `${cqRange?.brixMin} - ${cqRange?.brixMax}` : null}
                />

                <TextField
                    variant="standard"
                    label="Cor"
                    type="number"
                    value={form.color}
                    onChange={(e) => setFormField('color', e.target.value)}
                    helperText={cqRange ? `${cqRange?.colorMin} - ${cqRange?.colorMax}` : null}
                />

                <TextField
                    variant="standard"
                    label="Consistência"
                    type="number"
                    value={form.consistency}
                    onChange={(e) => setFormField('consistency', e.target.value)}
                    helperText={
                        cqRange ? `${cqRange?.consistencyMin} - ${cqRange?.consistencyMax}` : null
                    }
                />

                <TextField
                    variant="standard"
                    label="Acidez"
                    type="number"
                    value={form.acidity}
                    onChange={(e) => setFormField('acidity', e.target.value)}
                    helperText={cqRange ? `${cqRange?.acidityMin} - ${cqRange?.acidityMax}` : null}
                />

                <TextField
                    variant="standard"
                    label="pH"
                    type="number"
                    value={form.ph}
                    onChange={(e) => setFormField('ph', e.target.value)}
                    helperText={cqRange ? `${cqRange?.phMin} - ${cqRange?.phMax}` : null}
                />

                <TextField
                    variant="standard"
                    label="Sal Natural"
                    type="number"
                    value={form.naturalSalt}
                    onChange={(e) => setFormField('naturalSalt', e.target.value)}
                    helperText={
                        cqRange ? `${cqRange?.naturalSaltMin} - ${cqRange?.naturalSaltMax}` : null
                    }
                />
            </div>

            <div className="row">
                <TextField
                    variant="standard"
                    label="Impurezas"
                    type="number"
                    value={form.impurities}
                    onChange={(e) => setFormField('impurities', e.target.value)}
                    helperText={
                        cqRange ? `${cqRange?.impuritiesMin} - ${cqRange?.impuritiesMax}` : null
                    }
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
                    helperText={cqRange ? `${cqRange?.fungusMin} - ${cqRange?.fungusMax}` : null}
                />

                <TextField
                    variant="standard"
                    label="Temperatura"
                    type="number"
                    value={form.temperature}
                    onChange={(e) => setFormField('temperature', e.target.value)}
                    helperText={
                        cqRange ? `${cqRange?.temperatureMin} - ${cqRange?.temperatureMax}` : null
                    }
                />

                <TextField
                    variant="standard"
                    label="Mat. Est. Inseto"
                    type="number"
                    value={form.foreignMatterInsect}
                    onChange={(e) => setFormField('foreignMatterInsect', e.target.value)}
                    helperText={
                        cqRange
                            ? `${cqRange?.foreignMatterInsectMin} - ${cqRange?.foreignMatterInsectMax}`
                            : null
                    }
                />

                <TextField
                    variant="standard"
                    label="Mat. Est. Roedor"
                    type="number"
                    value={form.foreignMatterRodent}
                    onChange={(e) => setFormField('foreignMatterRodent', e.target.value)}
                    helperText={
                        cqRange
                            ? `${cqRange?.foreignMatterRodentMin} - ${cqRange?.foreignMatterRodentMax}`
                            : null
                    }
                />
            </div>

            <div className="row">
                <TextField
                    variant="standard"
                    label="Mensagem para Operador"
                    value={form.message}
                    onChange={(e) => setFormField('message', e.target.value)}
                />
            </div>

            <div className="row">
                <TextField
                    variant="standard"
                    label="Especificações (Uso Interno)"
                    value={form.specifications}
                    onChange={(e) => setFormField('specifications', e.target.value)}
                />
            </div>

            <div className="row">
                <TextField
                    variant="standard"
                    label="Observações (Etiqueta)"
                    value={form.observations}
                    onChange={(e) => setFormField('observations', e.target.value)}
                />
            </div>

            <div className="row">
                <FormOrders />
            </div>

            <div className="row actions">
                <Button variant="contained" onClick={save}>
                    Salvar
                </Button>
            </div>
        </div>
    );
};

export default ReportParametersForm;
