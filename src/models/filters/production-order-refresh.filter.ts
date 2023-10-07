import dayjs from 'dayjs';

export interface ProductionOrderRefreshFilter {
    returnStartDate?: dayjs.Dayjs | null;
    returnEndDate?: dayjs.Dayjs | null;
}
