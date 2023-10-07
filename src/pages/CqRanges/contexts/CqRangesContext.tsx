import { createContext, useContext, useEffect, useState } from 'react';
import { useLoader } from '../../../contexts/LoaderContext';
import { useToast } from '../../../contexts/ToastContext';
import { createCqRangeService } from '../../../services/cq-range.service';
import { CqRange } from '../../../models/api/cq-range';
import { CqRangeUpdateDto } from '../../../models/dtos/cq-range-update.dto';

type FormValueType = [number | undefined, number | undefined];

interface FormType {
    brix: FormValueType;
    color: FormValueType;
    consistency: FormValueType;
    acidity: FormValueType;
    ph: FormValueType;
    naturalSalt: FormValueType;
    impurities: FormValueType;
    fungus: FormValueType;
    temperature: FormValueType;
    foreignMatterInsect: FormValueType;
    foreignMatterRodent: FormValueType;
}

export interface CqRangesProvider {
    form: FormType;
    setFormField: (field: keyof FormType, value: FormType[keyof FormType]) => void;
    save: () => void;
    labels: { [key: string]: string };
}

interface CqRangesProviderProps {
    children: JSX.Element | JSX.Element[];
}

const ReportParametersContext = createContext<CqRangesProvider | undefined>(undefined);

const CqRangesProvider = (props: CqRangesProviderProps) => {
    const loader = useLoader();
    const toast = useToast();

    const cqRangeService = createCqRangeService();

    const labels = {
        brix: 'Brix',
        color: 'Cor',
        consistency: 'Consistência',
        acidity: 'Acidez',
        ph: 'pH',
        naturalSalt: 'Sal Natural',
        impurities: 'Impurezas',
        fungus: 'Fungo',
        temperature: 'Temperatura',
        foreignMatterInsect: 'Mat. Estranha Inseto',
        foreignMatterRodent: 'Mat. Estranha Roedor'
    };

    const [form, setForm] = useState<FormType>({
        brix: [0, 0],
        color: [0, 0],
        consistency: [0, 0],
        acidity: [0, 0],
        ph: [0, 0],
        naturalSalt: [0, 0],
        impurities: [0, 0],
        fungus: [0, 0],
        temperature: [0, 0],
        foreignMatterInsect: [0, 0],
        foreignMatterRodent: [0, 0]
    });

    useEffect(() => {
        getCqRange().then(setFormValues);
    }, []);

    const getCqRange = (): Promise<CqRange> => {
        return new Promise((resolve) => {
            loader.show();
            cqRangeService
                .get()
                .then((response) => {
                    loader.hide();
                    resolve(response);
                })
                .catch(() => {
                    loader.hide();
                    toast.show('Erro carregar faixas CQ', 'error');
                });
        });
    };

    const setFormValues = (values: CqRange) => {
        setForm({
            brix: [values.brixMin, values.brixMax],
            color: [values.colorMin, values.colorMax],
            consistency: [values.consistencyMin, values.consistencyMax],
            acidity: [values.acidityMin, values.acidityMax],
            ph: [values.phMin, values.phMax],
            naturalSalt: [values.naturalSaltMin, values.naturalSaltMax],
            impurities: [values.impuritiesMin, values.impuritiesMax],
            fungus: [values.fungusMin, values.fungusMax],
            temperature: [values.temperatureMin, values.temperatureMax],
            foreignMatterInsect: [values.foreignMatterInsectMin, values.foreignMatterInsectMax],
            foreignMatterRodent: [values.foreignMatterRodentMin, values.foreignMatterRodentMax]
        });
    };

    const setFormField = (field: keyof FormType, value: FormType[keyof FormType]) => {
        setForm((prevForm) => ({
            ...prevForm,
            [field]: value
        }));
    };

    const formIsValid = () => {
        const emptyFields: string[] = [];

        Object.entries(form).forEach(([key, value]) => {
            if (value[0] === undefined) emptyFields.push(`${labels[key as keyof FormType]} - Min`);

            if (value[1] === undefined) emptyFields.push(`${labels[key as keyof FormType]} - Max`);
        });

        if (emptyFields.length)
            toast.show(
                `Preencha todos os campos. Campos vazios: ${emptyFields.join(', ')}`,
                'error'
            );

        return !emptyFields.length;
    };

    const save = () => {
        const emptyFields = Object.entries(form).filter(([, value]) => value === '');

        if (emptyFields.length > 0) {
            toast.show(
                `Preencha todos os campos. Campos vazios: ${emptyFields
                    .map(([key]) => key)
                    .join(', ')}`,
                'error'
            );
            return;
        }

        if (!formIsValid()) return;

        const dto: CqRangeUpdateDto = {
            brixMin: form.brix[0]!,
            brixMax: form.brix[1]!,
            colorMin: form.color[0]!,
            colorMax: form.color[1]!,
            consistencyMin: form.consistency[0]!,
            consistencyMax: form.consistency[1]!,
            acidityMin: form.acidity[0]!,
            acidityMax: form.acidity[1]!,
            phMin: form.ph[0]!,
            phMax: form.ph[1]!,
            naturalSaltMin: form.naturalSalt[0]!,
            naturalSaltMax: form.naturalSalt[1]!,
            impuritiesMin: form.impurities[0]!,
            impuritiesMax: form.impurities[1]!,
            fungusMin: form.fungus[0]!,
            fungusMax: form.fungus[1]!,
            temperatureMin: form.temperature[0]!,
            temperatureMax: form.temperature[1]!,
            foreignMatterInsectMin: form.foreignMatterInsect[0]!,
            foreignMatterInsectMax: form.foreignMatterInsect[1]!,
            foreignMatterRodentMin: form.foreignMatterRodent[0]!,
            foreignMatterRodentMax: form.foreignMatterRodent[1]!
        };

        loader.show();
        cqRangeService
            .update(dto)
            .then((response) => {
                loader.hide();
                toast.show('Faixas atualizadas com sucesso', 'success');
                setFormValues(response);
            })
            .catch(() => {
                loader.hide();
                toast.show('Erro ao salvar faixas', 'error');
            });
    };

    return (
        <ReportParametersContext.Provider
            value={{
                form,
                setFormField,
                save,
                labels
            }}
        >
            {props.children}
        </ReportParametersContext.Provider>
    );
};

export default CqRangesProvider;

export const useCqRangesContext = () => useContext(ReportParametersContext)!;
