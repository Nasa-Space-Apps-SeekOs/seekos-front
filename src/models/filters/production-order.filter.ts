import dayjs from 'dayjs';

export interface ProductionOrderFilter {
    startDate?: dayjs.Dayjs | null;
    endDate?: dayjs.Dayjs | null;
}
