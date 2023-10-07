import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import './index.scss';
import { usePulpReportContext } from '../../contexts/PulpReportContext';

const ReportProductionOrders = () => {
    const { productionOrders } = usePulpReportContext();

    return (
        <div id="report-production-orders">
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ordem</TableCell>
                            <TableCell align="right">Item</TableCell>
                            <TableCell align="right">Descrição</TableCell>
                            <TableCell align="right">UM</TableCell>
                            <TableCell align="right">Qtd. Ordem</TableCell>
                            <TableCell align="right">Qtd. Reportada</TableCell>
                            <TableCell align="right">Qtd. Tambores</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productionOrders.map((order, i) => (
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {order.orderNumber}
                                </TableCell>
                                <TableCell align="right">{order.itemCode}</TableCell>
                                <TableCell align="right">{order.itemDescription}</TableCell>
                                <TableCell align="right">{order.unit}</TableCell>
                                <TableCell align="right">{order.orderQuantity}</TableCell>
                                <TableCell align="right">{order.producedQuantity}</TableCell>
                                <TableCell align="right">{order.reportedBarrelsQuantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ReportProductionOrders;
