import { CqRange } from '../models/api/cq-range';
import { CqRangeUpdateDto } from '../models/dtos/cq-range-update.dto';
import { http } from './config/http';
import { URLS } from './config/urls';

export const createCqRangeService = () => {
    const get = (): Promise<CqRange> => {
        return http()
            .get<any>(URLS.api.cqRanges.get())
            .then((response) => response.data);
    };

    const update = (dto: CqRangeUpdateDto): Promise<CqRange> => {
        return http()
            .put<any>(URLS.api.cqRanges.update(), dto)
            .then((response) => response.data);
    };

    return {
        get,
        update
    };
};
