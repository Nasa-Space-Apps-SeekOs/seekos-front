import { Dispatch, createContext, useContext, useEffect, useState } from 'react';
import { useLoader } from '../../../contexts/LoaderContext';
import { useToast } from '../../../contexts/ToastContext';
import { ReportParameter } from '../../../models/api/report-parameter';
import { createReportService } from '../../../services/report.service';
import { mapHttpError } from '../../../util/helpers/http-error';
import { Operator } from '../../../models/api/operator';
import { useOperatorContext } from '../../../contexts/OperatorContext';
import { createReportParameterService } from '../../../services/report-parameter.service';
import { ReportDto } from '../../../models/dtos/report.dto';
import { createStorage } from '../../../core/storage';
import { createProductionOrderService } from '../../../services/production-order.service';
import { ProductionOrder } from '../../../models/api/production-order';

interface FormType {
    productionOrderNumber: number;
    reportQuantity: number;
    port: number;
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
    specifications: string;
    observations: string;
    printerAddress: string;
}

export interface IPulpReportManualProvider {
    form: Partial<FormType>;
    setFormField: (field: keyof FormType, value: FormType[keyof FormType]) => void;
    save: () => void;
    operatorRegistrationValue: string;
    setOperatorRegistrationValue: Dispatch<React.SetStateAction<string>>;
    operator: Operator | undefined;
    reportParameter: ReportParameter | undefined;
    getReportByLotNumber: (lotNumber: string) => void;
}

interface PulpReportManualProviderProps {
    children: JSX.Element | JSX.Element[];
}

const PulpReportManualContext = createContext<IPulpReportManualProvider | undefined>(undefined);

const PulpReportManualProvider = (props: PulpReportManualProviderProps) => {
    const loader = useLoader();
    const toast = useToast();

    const { operator, getOperator, clearOperator } = useOperatorContext();

    const storage = createStorage();
    const reportService = createReportService();
    const reportParameterService = createReportParameterService();
    const productionOrderService = createProductionOrderService();

    const getEmptyForm = (): FormType => ({
        productionOrderNumber: 0,
        reportQuantity: 0,
        port: 0,
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
        specifications: '',
        observations: '',
        printerAddress: ''
    });

    const [form, setForm] = useState<FormType>(getEmptyForm());

    const [operatorRegistrationValue, setOperatorRegistrationValue] = useState<string>('');

    const [reportParameter, setReportParameter] = useState<ReportParameter>();

    const [productionOrder, setProductionOrder] = useState<ProductionOrder>();

    useEffect(() => {
        if (operator) setOperatorRegistrationValue(operator.registration);
    }, [operator]);

    useEffect(() => {
        if (!operatorRegistrationValue) {
            clearOperator();
            return;
        }

        getOperator(operatorRegistrationValue, true);
    }, [operatorRegistrationValue]);

    useEffect(() => {
        const lastManualPrinterAddress = storage.getData().lastManualPrinterAddress;

        if (lastManualPrinterAddress) {
            setForm({
                ...form,
                printerAddress: lastManualPrinterAddress
            });
        }
    }, []);

    useEffect(() => {
        getParameters();
    }, []);

    const getReportByLotNumber = (lotNumber: string) => {
        loader.show();
        reportService
            .getByLotNumber(lotNumber)
            .then((response) => {
                loader.hide();
                setForm({
                    ...getEmptyForm(),
                    productionOrderNumber: response.productionOrderNumber,
                    reportQuantity: response.reportQuantity,
                    port: response.port,
                    brix: response.brix,
                    color: response.color,
                    consistency: response.consistency,
                    acidity: response.acidity,
                    ph: response.ph,
                    naturalSalt: response.naturalSalt,
                    impurities: response.impurities,
                    refining: response.refining,
                    fungus: response.fungus,
                    temperature: response.temperature,
                    foreignMatterInsect: response.foreignMatterInsect,
                    foreignMatterRodent: response.foreignMatterRodent,
                    specifications: response.specifications,
                    observations: response.observations,
                    printerAddress: form.printerAddress
                });

                getProductionOrder(response.productionOrderNumber);
            })
            .catch(() => {
                loader.hide();
                toast.show('Erro ao carregar reporte', 'error');
            });
    };

    const getProductionOrder = (orderNumber: number) => {
        productionOrderService
            .getByOrderNumber(orderNumber)
            .then((response) => {
                setProductionOrder(response);
            })
            .catch(() => {
                toast.show('Erro ao carregar ordem de produção', 'error');
            });
    };

    const getParameters = () => {
        return reportParameterService
            .get()
            .then((response) => {
                setReportParameter(response);
                return response;
            })
            .catch(() => {
                toast.show('Erro ao carregar parâmetros', 'error');
            });
    };

    const setFormField = (field: keyof FormType, value: FormType[keyof FormType]) => {
        setForm((prevForm) => ({
            ...prevForm,
            [field]: value
        }));
    };

    const save = () => {
        const requiredFields = [
            'productionOrderNumber',
            'reportQuantity',
            'port',
            'brix',
            'color',
            'consistency',
            'acidity',
            'ph',
            'naturalSalt',
            'impurities',
            'refining',
            'fungus',
            'temperature',
            'foreignMatterInsect',
            'foreignMatterRodent'
        ];

        const emptyFields = Object.entries(form).filter(
            ([key, value]) => requiredFields.includes(key) && value === ''
        );

        if (emptyFields.length > 0) {
            toast.show(
                `Preencha os campos vazios: ${emptyFields.map(([key]) => key).join(', ')}`,
                'error'
            );
            return;
        }

        if (!operator) {
            toast.show('Erro ao carregar operador', 'error');
            return;
        }

        const dto: ReportDto = {
            productionOrderNumber: Number(String(form.productionOrderNumber).replace(',', '.')),
            type: productionOrder?.itemCode?.slice(-1),
            reportQuantity: Number(String(form.reportQuantity).replace(',', '.')),
            port: form.port,
            brix: Number(String(form.brix).replace(',', '.')),
            color: Number(String(form.color).replace(',', '.')),
            consistency: Number(String(form.consistency).replace(',', '.')),
            acidity: Number(String(form.acidity).replace(',', '.')),
            ph: Number(String(form.ph).replace(',', '.')),
            naturalSalt: Number(String(form.naturalSalt).replace(',', '.')),
            impurities: Number(String(form.impurities).replace(',', '.')),
            refining: form.refining,
            fungus: Number(String(form.fungus).replace(',', '.')),
            temperature: Number(String(form.temperature).replace(',', '.')),
            foreignMatterInsect: Number(String(form.foreignMatterInsect).replace(',', '.')),
            foreignMatterRodent: Number(String(form.foreignMatterRodent).replace(',', '.')),
            specifications: form.specifications,
            observations: form.observations,
            printerAddress: form.printerAddress,
            operatorId: operator.id
        };

        loader.show();
        reportService
            .createReport(dto)
            .then((response) => {
                loader.hide();
                toast.show(
                    `Reporte ${response.lotNumber} criado com sucesso. Peso: ${response.reportQuantity} Kg`,
                    'success'
                );

                if (dto.printerAddress) {
                    storage.setData({
                        ...storage.getData(),
                        lastManualPrinterAddress: dto.printerAddress
                    });

                    storage.saveData();
                }
            })
            .catch((error) => {
                loader.hide();
                toast.show(mapHttpError(error), 'error');
            });
    };

    return (
        <PulpReportManualContext.Provider
            value={{
                form,
                setFormField,
                save,
                operatorRegistrationValue,
                setOperatorRegistrationValue,
                operator,
                reportParameter,
                getReportByLotNumber
            }}
        >
            {props.children}
        </PulpReportManualContext.Provider>
    );
};

export default PulpReportManualProvider;

export const usePulpReportManualContext = () => useContext(PulpReportManualContext)!;
