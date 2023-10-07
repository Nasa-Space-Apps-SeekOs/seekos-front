import { Report } from '../models/api/report';
import { ReportUpdateQuantityResponse } from '../models/api/report-update-quantity-response';
import { ReportDto } from '../models/dtos/report.dto';
import { http } from './config/http';
import { URLS } from './config/urls';

export const createReportService = () => {
    const createReport = (dto: ReportDto): Promise<Report> => {
        return http()
            .post<any>(URLS.api.reports.report(), dto)
            .then((response) => response.data);
    };

    const printTicket = (options: {
        productionOrderNumber?: number | null;
        port?: number | null;
        isReprint?: boolean;
    }): Promise<void> => {
        const { productionOrderNumber, port, isReprint } = options;
        return http()
            .post<any>(URLS.api.reports.printTicket(), null, {
                params: {
                    productionOrderNumber: productionOrderNumber || '',
                    port: port || '',
                    isReprint: isReprint || ''
                }
            })
            .then((response) => response.data);
    };

    const sync = (): Promise<void> => {
        return http()
            .post<any>(URLS.api.reports.sync())
            .then((response) => response.data);
    };

    const deleteReport = (reportId: number): Promise<void> => {
        return http()
            .delete<any>(URLS.api.reports.deleteReport(reportId))
            .then((response) => response.data);
    };

    const getLastReportToDelete = (): Promise<Report> => {
        return http()
            .get<any>(URLS.api.reports.getLastReportOtDelete())
            .then((response) => response.data);
    };

    const getAllByOrderNumber = (orderNumber: number): Promise<Report[]> => {
        return http()
            .get<any>(URLS.api.reports.getAllByOrderNumber(orderNumber))
            .then((response) => response.data);
    };

    const updateQuantity = (
        reportId: number,
        quantity: number
    ): Promise<ReportUpdateQuantityResponse> => {
        return http()
            .patch<any>(URLS.api.reports.updateQuantity(reportId), { quantity })
            .then((response) => response.data);
    };

    const getByLotNumber = (lotNumber: string): Promise<Report> => {
        return http()
            .get<any>(URLS.api.reports.getByLotNumber(lotNumber))
            .then((response) => response.data);
    };

    return {
        createReport,
        printTicket,
        deleteReport,
        getAllByOrderNumber,
        getLastReportToDelete,
        sync,
        updateQuantity,
        getByLotNumber
    };
};
