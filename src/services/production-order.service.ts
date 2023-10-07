import { ProductionOrder } from '../models/api/production-order';
import { ProductionOrderRefreshFilter } from '../models/filters/production-order-refresh.filter';
import { ProductionOrderFilter } from '../models/filters/production-order.filter';
import { http } from './config/http';
import { URLS } from './config/urls';

export const createProductionOrderService = () => {
    const getAll = (filter: ProductionOrderFilter): Promise<ProductionOrder[]> => {
        return http()
            .get<any>(URLS.api.productionOrders.getAll(), {
                params: {
                    startDate: filter.startDate?.format('YYYY-MM-DD') || '',
                    endDate: filter.endDate?.format('YYYY-MM-DD') || ''
                }
            })
            .then((response) => response.data);
    };

    const getByOrderNumber = (orderNumber: number): Promise<ProductionOrder> => {
        return http()
            .get<any>(URLS.api.productionOrders.getByOrderNumber(orderNumber))
            .then((response) => response.data);
    };

    const refresh = (filter: ProductionOrderRefreshFilter): Promise<ProductionOrder[]> => {
        return http()
            .get<any>(URLS.api.productionOrders.refresh(), {
                params: {
                    startDate: filter.returnStartDate?.format('YYYY-MM-DD') || '',
                    endDate: filter.returnEndDate?.format('YYYY-MM-DD') || ''
                }
            })
            .then((response) => response.data);
    };

    return {
        getAll,
        getByOrderNumber,
        refresh
    };
};
