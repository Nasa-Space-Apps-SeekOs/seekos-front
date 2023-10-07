import { Dispatch, RefObject, createContext, useContext, useEffect, useRef, useState } from 'react';
import { ProductionOrder } from '../../../models/api/production-order';
import { ReportParameter } from '../../../models/api/report-parameter';
import { createReportParameterService } from '../../../services/report-parameter.service';
import { createProductionOrderService } from '../../../services/production-order.service';
import { useLoader } from '../../../contexts/LoaderContext';
import { useToast } from '../../../contexts/ToastContext';
import { Operator } from '../../../models/api/operator';
import { ScaleData } from '../../../models/api/scale-data';
import { createScaleService } from '../../../services/scale.service';
import { ReportDto } from '../../../models/dtos/report.dto';
import { createReportService } from '../../../services/report.service';
import { useOperatorContext } from '../../../contexts/OperatorContext';
import { usePromptModal } from '../../../contexts/PromptModalContext';
import dayjs from 'dayjs';

export interface IPulpReportProvider {
    operatorRegistrationValue: string | undefined;
    setOperatorRegistrationValue: Dispatch<React.SetStateAction<string | undefined>>;
    operator: Operator | undefined;
    productionOrders: ProductionOrder[];
    reportParameter: ReportParameter | undefined;
    scaleData: ScaleData | undefined;
    onKeyboardEvent: (shortcuts: { [key: string]: () => void }, event: KeyboardEvent) => void;
    handleCreateReport: (port: number) => void;
    reprint: (port: number) => void;
    deleteReport: (reportId: number) => void;
    ticket1Ref: RefObject<HTMLButtonElement>;
    reprint1Ref: RefObject<HTMLButtonElement>;
    deleteLastTicketRef: RefObject<HTMLButtonElement>;
    ticket2Ref: RefObject<HTMLButtonElement>;
    reprint2Ref: RefObject<HTMLButtonElement>;
}

interface PulpReportProviderProps {
    children: JSX.Element | JSX.Element[];
}

const PulpReportContext = createContext<IPulpReportProvider | undefined>(undefined);

const PulpReportProvider = (props: PulpReportProviderProps) => {
    const loader = useLoader();
    const toast = useToast();
    const promptModal = usePromptModal();

    const { operator, getOperator, clearOperator } = useOperatorContext();

    const reportParameterService = createReportParameterService();
    const productionOrderService = createProductionOrderService();
    const scaleService = createScaleService();
    const reportService = createReportService();

    const [operatorRegistrationValue, setOperatorRegistrationValue] = useState<string>();

    const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>([]);
    const [reportParameter, setReportParameter] = useState<ReportParameter>();
    const [scaleData, setScaleData] = useState<ScaleData>();

    const [lastScaleNozzleStatusData, setLastScaleNozzleStatusData] = useState<{
        isNozzle1Active: boolean;
        isNozzle2Active: boolean;
    }>({ isNozzle1Active: false, isNozzle2Active: false });

    const ticket1Ref = useRef<HTMLButtonElement>(null);
    const reprint1Ref = useRef<HTMLButtonElement>(null);
    const deleteLastTicketRef = useRef<HTMLButtonElement>(null);
    const ticket2Ref = useRef<HTMLButtonElement>(null);
    const reprint2Ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        getOrders(true);

        getParameters();
        const getParametersTimer = setInterval(getParameters, 5000);

        return () => {
            clearInterval(getParametersTimer);
        };
    }, []);

    useEffect(() => {
        let getScaleDataTimer: NodeJS.Timer;

        if (reportParameter?.useScale) {
            getScaleDataTimer = setInterval(getScaleData, 1000);
        }

        return () => {
            clearInterval(getScaleDataTimer);
        };
    }, [reportParameter]);

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
        if (scaleData) {
            const { isNozzle1Active: oldNozzle1IsActive, isNozzle2Active: oldNozzle2IsActive } =
                lastScaleNozzleStatusData;

            const { isNozzle1Active: newNozzle1IsActive, isNozzle2Active: newNozzle2IsActive } =
                scaleData;

            if (
                oldNozzle1IsActive !== newNozzle1IsActive ||
                oldNozzle2IsActive !== newNozzle2IsActive
            ) {
                if (oldNozzle1IsActive && !newNozzle1IsActive) {
                    handleCreateReport(1);
                }

                if (oldNozzle2IsActive && !newNozzle2IsActive) {
                    handleCreateReport(2);
                }

                setLastScaleNozzleStatusData({
                    isNozzle1Active: newNozzle1IsActive,
                    isNozzle2Active: newNozzle2IsActive
                });
            }
        }
    }, [scaleData]);

    const handleCreateReport = (port: number) => {
        if (reportParameter?.useScale) {
            const buttonElements: { [key: number]: HTMLButtonElement | null } = {
                1: ticket1Ref.current,
                2: ticket2Ref.current
            };

            const buttonElement = buttonElements[port];

            let finalizeInterval: () => void;

            if (buttonElement) {
                const currentButtonLabel = buttonElement.textContent;

                let counter = reportParameter.scaleDelayToReport / 1000;

                const setButtonLabel = () => {
                    buttonElement.textContent = `Reporte em ${counter} segundos...`;
                };

                setButtonLabel();
                const interval = setInterval(() => {
                    counter--;
                    setButtonLabel();
                }, 1000);

                finalizeInterval = () => {
                    clearInterval(interval);
                    buttonElement.textContent = currentButtonLabel;
                    buttonElement.disabled = false;
                };

                buttonElement.disabled = true;
            }

            createReport(
                port,
                () => finalizeInterval(),
                () => finalizeInterval()
            );
        } else {
            createReport(port);
        }
    };

    const getScaleData = () => {
        return scaleService
            .getData()
            .then((response) => setScaleData(response))
            .catch(() => {});
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

    const getOrders = (showLoader: boolean = false) => {
        if (showLoader) loader.show();

        productionOrderService
            .getAll({ startDate: dayjs(), endDate: dayjs() })
            .then((response) => {
                if (showLoader) loader.hide();

                setProductionOrders(response);
            })
            .catch(() => {
                if (showLoader) loader.hide();

                toast.show('Erro ao carregar ordens de produção', 'error');
            });
    };

    const onKeyboardEvent = (shortcuts: { [key: string]: () => void }, event: KeyboardEvent) => {
        const key = event.key.toLowerCase();

        if (document.activeElement === document.body) {
            event.preventDefault();

            const shortcutCaller = shortcuts[key];

            if (shortcutCaller) shortcutCaller();
        } else {
            if (key === 'enter' && document.activeElement instanceof HTMLInputElement)
                document.activeElement.blur();
        }
    };

    const createReport = async (
        port: number,
        onStartReport?: () => void,
        onErrorStartReport?: () => void
    ) => {
        if (!operator) {
            toast.show('Erro ao carregar operador', 'error');
            if (onErrorStartReport) onErrorStartReport();
            return;
        }

        const weight = await getWeight(port);

        if (!weight || weight < 50) {
            toast.show('Peso obrigatório ou inferior a 50kg. Reporte não criado.');
            if (onErrorStartReport) onErrorStartReport();
            return;
        }

        const dto: ReportDto = {
            port,
            reportQuantity: Number(weight),
            operatorId: operator.id
        };

        if (onStartReport) onStartReport();

        loader.show();
        reportService
            .createReport(dto)
            .then((response) => {
                loader.hide();
                toast.show(
                    `Reporte ${response.lotNumber} criado com sucesso. Peso: ${response.reportQuantity} Kg`,
                    'success'
                );
                getOrders();
            })
            .catch(() => {
                loader.hide();
                toast.show('Erro ao criar reporte', 'error');
            });
    };

    const getWeight = async (port: number): Promise<number | undefined> => {
        return new Promise((resolve) => {
            if (reportParameter?.useScale) {
                setTimeout(() => {
                    scaleService.getData().then((response) => {
                        resolve(response[`weight${String(port) as '1' | '2'}`]);
                    });
                }, reportParameter.scaleDelayToReport);
            } else {
                promptModal
                    .open({
                        label: `Digite o peso da balança ${port}`,
                        inputType: 'number',
                        useVirtualKeyboard: true,
                        virtualKeyboardPosition: 'right'
                    })
                    .then((resultValue) => resolve(resultValue as number | undefined));
            }
        });
    };

    const reprint = (port: number) => {
        loader.show();
        reportService
            .printTicket({ port, isReprint: true })
            .then(() => loader.hide())
            .catch(() => {
                loader.hide();
                toast.show('Erro ao reimprimir etiqueta', 'error');
            });
    };

    const deleteReport = (reportId: number) => {
        loader.show();
        reportService
            .deleteReport(reportId)
            .then(() => {
                loader.hide();
                toast.show('Reporte excluído com sucesso', 'success');
                getOrders();
            })
            .catch(() => {
                loader.hide();
                toast.show('Erro ao excluir reporte', 'error');
            });
    };

    return (
        <PulpReportContext.Provider
            value={{
                operatorRegistrationValue,
                setOperatorRegistrationValue,
                operator,
                productionOrders,
                reportParameter,
                scaleData,
                onKeyboardEvent,
                handleCreateReport,
                reprint,
                deleteReport,
                ticket1Ref,
                reprint1Ref,
                deleteLastTicketRef,
                ticket2Ref,
                reprint2Ref
            }}
        >
            {props.children}
        </PulpReportContext.Provider>
    );
};

export default PulpReportProvider;

export const usePulpReportContext = () => useContext(PulpReportContext)!;
