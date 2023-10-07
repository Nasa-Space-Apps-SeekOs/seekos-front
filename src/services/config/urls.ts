import { ENV } from '../../env';

const { REACT_APP_API_BASE_URL: API_BASE_URL, REACT_APP_SCALE_URL: SCALE_URL } = ENV;

export const URLS = {
    api: {
        auth: {
            login: () => `${API_BASE_URL}/v1/auth/login`
        },
        cqRanges: {
            get: () => `${API_BASE_URL}/v1/cq-ranges`,
            update: () => `${API_BASE_URL}/v1/cq-ranges`
        },
        reportParameters: {
            get: () => `${API_BASE_URL}/v1/report-parameters`,
            update: () => `${API_BASE_URL}/v1/report-parameters`
        },
        productionOrders: {
            getAll: () => `${API_BASE_URL}/v1/production-orders`,
            getByOrderNumber: (orderNumber: number) =>
                `${API_BASE_URL}/v1/production-orders/${orderNumber}`,
            refresh: () => `${API_BASE_URL}/v1/production-orders/refresh`
        },
        operators: {
            getByRegistration: (registration: string) =>
                `${API_BASE_URL}/v1/operators/by-registration/${registration}`
        },
        reports: {
            report: () => `${API_BASE_URL}/v1/reports`,
            sync: () => `${API_BASE_URL}/v1/reports/sync`,
            printTicket: () => `${API_BASE_URL}/v1/reports/print-ticket`,
            deleteReport: (reportId: number) => `${API_BASE_URL}/v1/reports/${reportId}`,
            getLastReportOtDelete: () => `${API_BASE_URL}/v1/reports/last-to-delete`,
            getAllByOrderNumber: (orderNumber: number) =>
                `${API_BASE_URL}/v1/reports/by-order/${orderNumber}`,
            updateQuantity: (reportId: number) =>
                `${API_BASE_URL}/v1/reports/update-quantity/${reportId}`,
            getByLotNumber: (lotNumber: string) =>
                `${API_BASE_URL}/v1/reports/by-lot-number/${lotNumber}`
        },
        repository: {
            search: () => `${API_BASE_URL}/repository`,
            getById: (id: number) => `${API_BASE_URL}/repository/${id}`,
            create: () => `${API_BASE_URL}/repository`,
            update: (id: number) => `${API_BASE_URL}/repository/${id}`,
            delete: (id: number) => `${API_BASE_URL}/repository/${id}`
        }
    },
    scale: {
        getData: () => `${SCALE_URL}/dados`
    }
};
