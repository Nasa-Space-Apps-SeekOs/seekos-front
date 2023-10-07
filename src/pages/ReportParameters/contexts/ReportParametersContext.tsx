import { createContext, useContext, useEffect, useState } from 'react';
import { createReportParameterService } from '../../../services/report-parameter.service';
import { useLoader } from '../../../contexts/LoaderContext';
import { useToast } from '../../../contexts/ToastContext';
import { ReportParameter } from '../../../models/api/report-parameter';
import { ReportParameterUpdateDto } from '../../../models/dtos/report-parameter-update.dto';
import { createCqRangeService } from '../../../services/cq-range.service';
import { CqRange } from '../../../models/api/cq-range';
import { ProductionOrder } from '../../../models/api/production-order';
import { createProductionOrderService } from '../../../services/production-order.service';
import dayjs from 'dayjs';
import { mapHttpError } from '../../../util/helpers/http-error';

interface FormType {
    brix: number;
    color: number;
    consistency: number;
    acidity: number;
    ph: number;
    naturalSalt: number;
    impurities: number;
    refining: string;
    fungus: number;
    temperature: number;
    foreignMatterInsect: number;
    foreignMatterRodent: number;
    message: string;
    specifications: string;
    observations: string;
    productionOrderNumber: number;
    printerAddress: string;
    useScale: boolean;
    scaleDelayToReport: number;
}

export interface IReportParametersProvider {
    form: Partial<FormType>;
    setFormField: (field: keyof FormType, value: FormType[keyof FormType]) => void;
    save: () => void;
    cqRange: CqRange | undefined;
    parameter: ReportParameter | undefined;
    orders: ProductionOrder[];
    refreshOrders: (
        returnStartDate?: dayjs.Dayjs | null,
        returnEndDate?: dayjs.Dayjs | null
    ) => void;
    selectedProductionOrder: ProductionOrder | undefined;
    getOrders: (startDate?: dayjs.Dayjs | null, endDate?: dayjs.Dayjs | null) => Promise<void>;
}

interface ReportParametersProviderProps {
    children: JSX.Element | JSX.Element[];
}

const ReportParametersContext = createContext<IReportParametersProvider | undefined>(undefined);

const ReportParametersProvider = (props: ReportParametersProviderProps) => {
    const loader = useLoader();
    const toast = useToast();

    const reportParameterService = createReportParameterService();
    const cqRangeService = createCqRangeService();
    const productionOrderService = createProductionOrderService();

    const [parameter, setParameter] = useState<ReportParameter>();
    const [cqRange, setCqRange] = useState<CqRange>();
    const [orders, setOrders] = useState<ProductionOrder[]>([]);

    const [form, setForm] = useState<FormType>({
        brix: 0,
        color: 0,
        consistency: 0,
        acidity: 0,
        ph: 0,
        naturalSalt: 0,
        impurities: 0,
        refining: '',
        fungus: 0,
        temperature: 0,
        foreignMatterInsect: 0,
        foreignMatterRodent: 0,
        message: '',
        specifications: '',
        observations: '',
        productionOrderNumber: 0,
        printerAddress: '',
        useScale: false,
        scaleDelayToReport: 0
    });

    useEffect(() => {
        loader.show();
        Promise.allSettled([getParameters(), getCqRange(), getOrders()]).then(() => loader.hide());
    }, []);

    const getParameters = () => {
        return reportParameterService
            .get()
            .then((response) => {
                setParameter(response);
                setFormValues(response);
            })
            .catch(() => toast.show('Erro carregar parâmetros', 'error'));
    };

    const getCqRange = () => {
        return cqRangeService
            .get()
            .then(setCqRange)
            .catch(() => toast.show('Erro carregar faixas CQ', 'error'));
    };

    const getOrders = (startDate?: dayjs.Dayjs | null, endDate?: dayjs.Dayjs | null) => {
        return productionOrderService
            .getAll({ startDate: startDate || dayjs(), endDate: endDate || dayjs() })
            .then(setOrders)
            .catch(() => toast.show('Erro carregar ordens', 'error'));
    };

    const refreshOrders = (
        returnStartDate?: dayjs.Dayjs | null,
        returnEndDate?: dayjs.Dayjs | null
    ) => {
        loader.show();
        productionOrderService
            .refresh({ returnStartDate, returnEndDate })
            .then((response) => {
                loader.hide();
                setOrders(response);
            })
            .catch((error) => {
                loader.hide();
                toast.show(mapHttpError(error), 'error');
            });
    };

    const setFormValues = (values: ReportParameter) => {
        setForm({
            productionOrderNumber: values.productionOrderNumber,
            brix: values.brix,
            color: values.color,
            consistency: values.consistency,
            acidity: values.acidity,
            ph: values.ph,
            naturalSalt: values.naturalSalt,
            impurities: values.impurities,
            refining: values.refining,
            fungus: values.fungus,
            temperature: values.temperature,
            foreignMatterInsect: values.foreignMatterInsect,
            foreignMatterRodent: values.foreignMatterRodent,
            message: values.message,
            specifications: values.specifications,
            observations: values.observations,
            printerAddress: values.printerAddress,
            useScale: values.useScale,
            scaleDelayToReport: values.scaleDelayToReport
        });
    };

    const setFormField = (field: keyof FormType, value: FormType[keyof FormType]) => {
        setForm((prevForm) => ({
            ...prevForm,
            [field]: value
        }));
    };

    const formIsValid = () => {
        if (!cqRange) {
            return false;
        }

        const errors: string[] = [];

        const fieldsOutOfRange: { fieldLabel: string; min: number; max: number }[] = [];

        if (form.brix < cqRange?.brixMin || form.brix > cqRange?.brixMax)
            fieldsOutOfRange.push({
                fieldLabel: 'Brix',
                min: cqRange?.brixMin,
                max: cqRange?.brixMax
            });

        if (form.color < cqRange?.colorMin || form.color > cqRange?.colorMax)
            fieldsOutOfRange.push({
                fieldLabel: 'Cor',
                min: cqRange?.colorMin,
                max: cqRange?.colorMax
            });

        if (
            form.consistency < cqRange?.consistencyMin ||
            form.consistency > cqRange?.consistencyMax
        )
            fieldsOutOfRange.push({
                fieldLabel: 'Consistância',
                min: cqRange?.consistencyMin,
                max: cqRange?.consistencyMax
            });

        if (form.acidity < cqRange?.acidityMin || form.acidity > cqRange?.acidityMax)
            fieldsOutOfRange.push({
                fieldLabel: 'Acidez',
                min: cqRange?.acidityMin,
                max: cqRange?.acidityMax
            });

        if (form.ph < cqRange?.phMin || form.ph > cqRange?.phMax)
            fieldsOutOfRange.push({ fieldLabel: 'pH', min: cqRange?.phMin, max: cqRange?.phMax });

        if (
            form.naturalSalt < cqRange?.naturalSaltMin ||
            form.naturalSalt > cqRange?.naturalSaltMax
        )
            fieldsOutOfRange.push({
                fieldLabel: 'Sal',
                min: cqRange?.naturalSaltMin,
                max: cqRange?.naturalSaltMax
            });

        if (form.impurities < cqRange?.impuritiesMin || form.impurities > cqRange?.impuritiesMax)
            fieldsOutOfRange.push({
                fieldLabel: 'Impureza',
                min: cqRange?.impuritiesMin,
                max: cqRange?.impuritiesMax
            });

        if (form.fungus < cqRange?.fungusMin || form.fungus > cqRange?.fungusMax)
            fieldsOutOfRange.push({
                fieldLabel: 'Fungus',
                min: cqRange?.fungusMin,
                max: cqRange?.fungusMax
            });

        if (
            form.temperature < cqRange?.temperatureMin ||
            form.temperature > cqRange?.temperatureMax
        )
            fieldsOutOfRange.push({
                fieldLabel: 'Temperatura',
                min: cqRange?.temperatureMin,
                max: cqRange?.temperatureMax
            });

        if (
            form.foreignMatterInsect < cqRange?.foreignMatterInsectMin ||
            form.foreignMatterInsect > cqRange?.foreignMatterInsectMax
        )
            fieldsOutOfRange.push({
                fieldLabel: 'Materiais Externos',
                min: cqRange?.foreignMatterInsectMin,
                max: cqRange?.foreignMatterInsectMax
            });

        if (
            form.foreignMatterRodent < cqRange?.foreignMatterRodentMin ||
            form.foreignMatterRodent > cqRange?.foreignMatterRodentMax
        )
            fieldsOutOfRange.push({
                fieldLabel: 'Materiais Externos',
                min: cqRange?.foreignMatterRodentMin,
                max: cqRange?.foreignMatterRodentMax
            });

        if (fieldsOutOfRange.length) {
            const fieldsOutOfRangeLabels = fieldsOutOfRange
                .map(({ fieldLabel }) => fieldLabel)
                .join(', ');

            errors.push(`Os seguintes campos estão fora dos limites: ${fieldsOutOfRangeLabels}`);
        }

        if (!form.productionOrderNumber) {
            errors.push('Informe o número da ordem de produção');
        }

        if (!form.printerAddress) {
            errors.push('Informe o endereço da impressora');
        }

        if (errors.length) {
            errors.forEach((error) => {
                toast.show(error, 'error');
            });

            return false;
        }

        return true;
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

        const formValues = form as ReportParameter;

        const dto: ReportParameterUpdateDto = {
            productionOrderNumber: formValues.productionOrderNumber,
            brix: formValues.brix,
            color: formValues.color,
            consistency: formValues.consistency,
            acidity: formValues.acidity,
            ph: formValues.ph,
            naturalSalt: formValues.naturalSalt,
            impurities: formValues.impurities,
            refining: formValues.refining,
            fungus: formValues.fungus,
            temperature: formValues.temperature,
            foreignMatterInsect: formValues.foreignMatterInsect,
            foreignMatterRodent: formValues.foreignMatterRodent,
            message: formValues.message,
            specifications: formValues.specifications,
            observations: formValues.observations,
            printerAddress: formValues.printerAddress,
            useScale: formValues.useScale,
            scaleDelayToReport: formValues.scaleDelayToReport
        };

        loader.show();
        reportParameterService
            .update(dto)
            .then((response) => {
                loader.hide();
                toast.show('Parâmetros atualizados com sucesso', 'success');
                setFormValues(response);
            })
            .catch(() => {
                loader.hide();
                toast.show('Erro ao salvar parâmetros', 'error');
            });
    };

    const selectedProductionOrder = orders.find(
        (o) => o.orderNumber === Number(form.productionOrderNumber)
    );

    return (
        <ReportParametersContext.Provider
            value={{
                form,
                setFormField,
                save,
                cqRange,
                parameter,
                orders,
                refreshOrders,
                selectedProductionOrder,
                getOrders
            }}
        >
            {props.children}
        </ReportParametersContext.Provider>
    );
};

export default ReportParametersProvider;

export const useReportParametersContext = () => useContext(ReportParametersContext)!;
