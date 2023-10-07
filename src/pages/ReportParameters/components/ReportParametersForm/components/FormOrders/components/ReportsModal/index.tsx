import { useEffect, useState } from 'react';
import './index.scss';
import { ModalRefPropType } from '../../../../../../../../contexts/ModalContext';
import { Report } from '../../../../../../../../models/api/report';
import { useLoader } from '../../../../../../../../contexts/LoaderContext';
import { useToast } from '../../../../../../../../contexts/ToastContext';
import { createReportService } from '../../../../../../../../services/report.service';
import {
    Checkbox,
    FormControlLabel,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from '@mui/material';
import {
    Delete as IconDelete,
    WarningAmber as IconWarning,
    Scale as IconScale
} from '@mui/icons-material';
import { useAlert } from '../../../../../../../../contexts/AlertContext';
import { usePromptModal } from '../../../../../../../../contexts/PromptModalContext';

export interface ReportsModalProps extends ModalRefPropType {
    orderNumber: number;
}

const ReportsModal = ({ orderNumber, modalRef }: ReportsModalProps) => {
    const loader = useLoader();
    const toast = useToast();
    const alert = useAlert();
    const promptModal = usePromptModal();

    const reportService = createReportService();

    const [reports, setReports] = useState<Report[]>([]);
    const [onlyReportsWithWarning, setOnlyReportsWithWarning] = useState(false);

    useEffect(() => {
        getReports();
    }, []);

    const getReports = () => {
        loader.show();
        reportService
            .getAllByOrderNumber(orderNumber)
            .then((response) => {
                loader.hide();
                setReports(response);
            })
            .catch(() => {
                loader.hide();
                toast.show('Erro ao carregar reportes', 'error');
                modalRef.close();
            });
    };

    const handleDeleteReport = (report: Report) => {
        alert.open({
            title: 'Excluir',
            message: `Excluir etiqueta do lote ${report.lotNumber}?`,
            buttons: [
                { text: 'Não', color: 'inherit' },
                { text: 'Sim', onClick: () => deleteReport(report.id) }
            ]
        });
    };

    const deleteReport = (reportId: number) => {
        loader.show();
        reportService
            .deleteReport(reportId)
            .then(() => {
                loader.hide();
                toast.show('Reporte excluído com sucesso', 'success');
                getReports();
            })
            .catch(() => {
                loader.hide();
                toast.show('Erro ao excluir reporte', 'error');
            });
    };

    const handleUpdateQuantity = (report: Report) => {
        promptModal
            .open({
                label: `Digite a nova quantidade`,
                inputType: 'number',
                useVirtualKeyboard: true,
                virtualKeyboardPosition: 'right'
            })
            .then((resultValue) => {
                if (resultValue) {
                    loader.show();
                    reportService
                        .updateQuantity(report.id, resultValue as number)
                        .then((response) => {
                            loader.hide();

                            if (response.totvsMessages?.length) {
                                const messages = response.totvsMessages.join('; ');
                                toast.show(`Quantidade alterada com avisos: ${messages}`, 'info');
                            } else {
                                toast.show('Quantidade alterada', 'success');
                            }

                            getReports();
                        })
                        .catch(() => {
                            loader.hide();
                            toast.show('Erro ao editar quantidade', 'error');
                        });
                }
            });
    };

    const renderWarning = (report: Report) => {
        if (report.reportNumber && !report.isDeleted) {
            return <></>;
        }

        let tooltipText = '';

        if (!report.reportNumber && report.isDeleted) {
            tooltipText = 'Não foi integrado com o TOTVS e foi DELETADO';
        } else if (!report.reportNumber) {
            tooltipText = 'Ainda não foi integrado com o TOTVS';
        } else if (report.isDeleted) {
            tooltipText = 'Foi DELETADO';
        }

        return (
            <Tooltip title={tooltipText}>
                <IconWarning color="warning" />
            </Tooltip>
        );
    };

    const rows = reports.filter((r) =>
        onlyReportsWithWarning ? !r.reportNumber || r.isDeleted : true
    );

    return (
        <div id="reports-modal">
            <div className="filters">
                <FormControlLabel
                    label="Apenas reportes pendentes"
                    labelPlacement="start"
                    control={
                        <Checkbox onChange={(e) => setOnlyReportsWithWarning(e.target.checked)} />
                    }
                />
            </div>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>#</TableCell>
                            <TableCell align="right">Quantidade</TableCell>
                            <TableCell align="right">Bico</TableCell>
                            <TableCell align="right">Lote</TableCell>
                            <TableCell align="right">Núm. Reporte (TOTVS)</TableCell>
                            <TableCell align="right">Deletado</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((report, i) => (
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{renderWarning(report)}</TableCell>
                                <TableCell align="right">{report.id}</TableCell>
                                <TableCell align="right">{report.reportQuantity}</TableCell>
                                <TableCell align="right">{report.port}</TableCell>
                                <TableCell align="right">{report.lotNumber}</TableCell>
                                <TableCell align="right">{report.reportNumber || '-'}</TableCell>
                                <TableCell align="right">{Number(report.isDeleted)}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeleteReport(report)}>
                                        <IconDelete />
                                    </IconButton>

                                    <IconButton onClick={() => handleUpdateQuantity(report)}>
                                        <IconScale />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ReportsModal;
