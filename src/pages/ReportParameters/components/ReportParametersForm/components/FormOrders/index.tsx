import {
    Badge,
    Button,
    IconButton,
    Paper,
    Radio,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { useReportParametersContext } from '../../../../contexts/ReportParametersContext';
import './index.scss';
import { Assignment as IconAssignment } from '@mui/icons-material';
import { ProductionOrder } from '../../../../../../models/api/production-order';
import { useModal } from '../../../../../../contexts/ModalContext';
import ReportsModal, { ReportsModalProps } from './components/ReportsModal';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useLoader } from '../../../../../../contexts/LoaderContext';
import { createReportService } from '../../../../../../services/report.service';
import { useToast } from '../../../../../../contexts/ToastContext';
import { mapHttpError } from '../../../../../../util/helpers/http-error';

interface FormType {
    startDate: dayjs.Dayjs | null;
    endDate: dayjs.Dayjs | null;
}

const FormOrders = () => {
    const { form, setFormField, orders, refreshOrders, getOrders } = useReportParametersContext();

    const reportService = createReportService();

    const modal = useModal();
    const loader = useLoader();
    const toast = useToast();

    const [filterForm, setFilterForm] = useState<FormType>({
        startDate: dayjs(),
        endDate: dayjs()
    });

    const handleOpenReports = (order: ProductionOrder) => {
        modal.open({
            component: ReportsModal,
            title: `Reportes - Ordem ${order.orderNumber}`,
            props: {
                orderNumber: order.orderNumber
            } as ReportsModalProps,
            onClose: () => handleFilter()
        });
    };

    const handleChangeStartDate = (value: dayjs.Dayjs | null) => {
        setFilterForm({ ...filterForm, startDate: value, endDate: value });
    };

    const handleFilter = () => {
        loader.show();
        getOrders(filterForm.startDate, filterForm.endDate)
            .then(() => {
                loader.hide();
            })
            .catch(() => {
                loader.hide();
            });
    };

    const handleRefresh = () => {
        refreshOrders(filterForm.startDate, filterForm.endDate);
    };

    const handleSyncReports = () => {
        toast.show('Sincronização de reportes iniciada...', 'info');
        reportService
            .sync()
            .then(() => {
                toast.show('Sincronização de reportes finalizada', 'success');
            })
            .catch((error) => toast.show(mapHttpError(error), 'error'));
    };

    return (
        <div id="form-orders">
            <div className="actions">
                <Button onClick={handleRefresh}>Atualizar Ordens</Button>
                <Button onClick={handleSyncReports} color="secondary">
                    Sincronizar com TOTVS
                </Button>
            </div>

            <div className="filters">
                <DatePicker
                    className="filters-item"
                    format="DD/MM/YYYY"
                    value={filterForm.startDate}
                    onChange={handleChangeStartDate}
                />

                <DatePicker
                    className="filters-item"
                    format="DD/MM/YYYY"
                    value={filterForm.endDate}
                    onChange={(value) => setFilterForm({ ...filterForm, endDate: value })}
                />

                <Button
                    color="primary"
                    variant="outlined"
                    className="filters-item"
                    onClick={handleFilter}
                >
                    Filtrar
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Ordem</TableCell>
                            <TableCell align="right">Data</TableCell>
                            <TableCell align="right">Item</TableCell>
                            <TableCell align="right">Descrição</TableCell>
                            <TableCell align="right">UM</TableCell>
                            <TableCell align="right">Qtd. Ordem</TableCell>
                            <TableCell align="right">Qtd. Reportada</TableCell>
                            <TableCell align="right">Qtd. Tambores</TableCell>
                            <TableCell align="right" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order, i) => (
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    <Radio
                                        checked={form.productionOrderNumber === order.orderNumber}
                                        onChange={() =>
                                            setFormField('productionOrderNumber', order.orderNumber)
                                        }
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {order.orderNumber}
                                </TableCell>
                                <TableCell align="right">
                                    {dayjs(order.startDate).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell align="right">{order.itemCode}</TableCell>
                                <TableCell align="right">{order.itemDescription}</TableCell>
                                <TableCell align="right">{order.unit}</TableCell>
                                <TableCell align="right">{order.orderQuantity}</TableCell>
                                <TableCell align="right">{order.producedQuantity}</TableCell>
                                <TableCell align="right">{order.reportedBarrelsQuantity}</TableCell>

                                <TableCell align="right">
                                    <IconButton onClick={() => handleOpenReports(order)}>
                                        <Badge
                                            badgeContent={order.reportAlertsCount}
                                            color="secondary"
                                        >
                                            <IconAssignment />
                                        </Badge>
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

export default FormOrders;
