import './index.scss';
import colors from '../../../../styles/colors.scss';
import { usePulpReportContext } from '../../contexts/PulpReportContext';
import { RefObject, useEffect, useRef } from 'react';
import { useAlert } from '../../../../contexts/AlertContext';
import { useLoader } from '../../../../contexts/LoaderContext';
import { useToast } from '../../../../contexts/ToastContext';
import { createReportService } from '../../../../services/report.service';

interface IndicatorOptions {
    label?: string;
    value?: string | number;
    background?: string;
    color?: string;
    borderColor?: string;
}

interface ButtonOptions {
    label: string;
    background?: string;
    color?: string;
    borderColor?: string;
    onClick: () => void;
    ref?: RefObject<HTMLButtonElement>;
}

const ReportActions = () => {
    const {
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
    } = usePulpReportContext();

    const alert = useAlert();
    const loader = useLoader();
    const toast = useToast();

    const reportService = createReportService();

    const clickOnButton = (buttonElement: HTMLButtonElement | null) => {
        buttonElement?.click();

        buttonElement?.classList.add('active');

        setTimeout(() => {
            buttonElement?.classList.remove('active');
        }, 100);
    };

    const shortcuts: { [key: string]: () => void } = {
        '1': () => clickOnButton(ticket1Ref.current),
        '7': () => clickOnButton(reprint1Ref.current),
        '3': () => clickOnButton(ticket2Ref.current),
        '9': () => clickOnButton(reprint2Ref.current),
        delete: () => clickOnButton(deleteLastTicketRef.current)
    };

    useEffect(() => {
        document.addEventListener('keypress', handleKeyboardEvent);

        return () => {
            document.removeEventListener('keypress', handleKeyboardEvent);
        };
    }, []);

    const handleKeyboardEvent = (event: KeyboardEvent) => {
        onKeyboardEvent(shortcuts, event);
    };

    const renderIndicator = (options: IndicatorOptions) => {
        return (
            <div
                className="indicator"
                style={{
                    backgroundColor: options.background,
                    color: options.color,
                    borderColor: options.borderColor || options.background
                }}
            >
                <label>{options.label}</label>
                <span>{options.value}</span>
            </div>
        );
    };

    const renderButton = (options: ButtonOptions) => {
        return (
            <button
                className="action-button"
                style={{
                    background: options.background,
                    color: options.color,
                    borderColor: options.borderColor || options.background
                }}
                onClick={options.onClick}
                ref={options.ref}
            >
                {options.label}
            </button>
        );
    };

    const handleDeleteLastReport = () => {
        loader.show();
        reportService
            .getLastReportToDelete()
            .then((response) => {
                loader.hide();
                alert.open({
                    title: 'Excluir',
                    message: `Excluir etiqueta do lote ${response.lotNumber}?`,
                    buttons: [
                        { text: 'Não', color: 'inherit' },
                        { text: 'Sim', onClick: () => deleteReport(response.id) }
                    ]
                });
            })
            .catch(() => {
                loader.hide();
                toast.show('Erro ao buscar última etiqueta', 'error');
            });
    };

    const scaleBackgroundColor = reportParameter?.useScale
        ? colors['color-neutral-10']
        : colors['color-neutral-5'];

    const scaleFontColor = reportParameter?.useScale
        ? colors['color-neutral-0']
        : colors['color-neutral-10'];

    return (
        <div id="report-actions">
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col">
                            {renderIndicator({
                                label: `BICO 1 - ${
                                    scaleData?.isNozzle1Active ? 'Ativo' : 'Inativo'
                                }`,
                                value: reportParameter?.useScale ? scaleData?.weight1 : '-',
                                background: scaleBackgroundColor,
                                color: scaleFontColor
                            })}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {renderButton({
                                label: 'Etiqueta (1)',
                                background: colors['color-orange'],
                                color: colors['color-neutral-0'],
                                onClick: () => handleCreateReport(1),
                                ref: ticket1Ref
                            })}
                        </div>
                        <div className="col">
                            {renderButton({
                                label: 'Reimprimir (7)',
                                background: colors['color-wetasphalt'],
                                color: colors['color-neutral-0'],
                                onClick: () => reprint(1),
                                ref: reprint1Ref
                            })}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            {renderIndicator({
                                label: 'ORDEM PRODUÇÃO',
                                value: reportParameter?.productionOrderNumber || '-',
                                background: colors['color-wine'],
                                color: colors['color-neutral-0']
                            })}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {renderIndicator({
                                label: 'BRIX',
                                value: reportParameter?.brix || '-',
                                background: colors['color-wisteria'],
                                color: colors['color-neutral-0']
                            })}
                        </div>
                        <div className="col">
                            {renderIndicator({
                                label: 'COR',
                                value: reportParameter?.color || '-',
                                background: colors['color-peterriver'],
                                color: colors['color-neutral-0']
                            })}
                        </div>
                        <div className="col">
                            {renderIndicator({
                                label: 'CONSISTÊNCIA',
                                value: reportParameter?.consistency || '-',
                                background: colors['color-nephritis'],
                                color: colors['color-neutral-0']
                            })}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {renderButton({
                                label: 'Eliminar última etiqueta (DEL)',
                                background: colors['color-neutral-0'],
                                color: colors['color-pomegranate'],
                                borderColor: colors['color-pomegranate'],
                                onClick: handleDeleteLastReport,
                                ref: deleteLastTicketRef
                            })}
                        </div>
                    </div>
                </div>
                <div className="col col-param-type">
                    {renderIndicator({
                        value: reportParameter?.type,
                        background: colors['color-sunflower'],
                        color: colors['color-neutral-10']
                    })}
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            {renderIndicator({
                                label: `BICO 2 - ${
                                    scaleData?.isNozzle2Active ? 'Ativo' : 'Inativo'
                                }`,
                                value: reportParameter?.useScale ? scaleData?.weight2 : '-',
                                background: scaleBackgroundColor,
                                color: scaleFontColor
                            })}
                        </div>
                    </div>
                    <div className="row row-param-type">
                        <div className="col">
                            {renderButton({
                                label: 'Etiqueta (3)',
                                background: colors['color-orange'],
                                color: colors['color-neutral-0'],
                                onClick: () => handleCreateReport(2),
                                ref: ticket2Ref
                            })}
                        </div>
                        <div className="col">
                            {renderButton({
                                label: 'Reimprimir (9)',
                                background: colors['color-wetasphalt'],
                                color: colors['color-neutral-0'],
                                onClick: () => reprint(2),
                                ref: reprint2Ref
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row row-param-observation">
                <div className="col">
                    {renderIndicator({
                        value: reportParameter?.message,
                        background: colors['color-pomegranate'],
                        color: colors['color-neutral-0']
                    })}
                </div>
            </div>
        </div>
    );
};

export default ReportActions;
