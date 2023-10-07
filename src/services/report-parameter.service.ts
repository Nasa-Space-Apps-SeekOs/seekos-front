import { ReportParameter } from '../models/api/report-parameter';
import { ReportParameterUpdateDto } from '../models/dtos/report-parameter-update.dto';
import { http } from './config/http';
import { URLS } from './config/urls';

export const createReportParameterService = () => {
    const get = (): Promise<ReportParameter> => {
        return http()
            .get<any>(URLS.api.reportParameters.get())
            .then((response) => response.data);
    };

    const update = (dto: ReportParameterUpdateDto): Promise<ReportParameter> => {
        return http()
            .put<any>(URLS.api.reportParameters.update(), dto)
            .then((response) => response.data);
    };

    return {
        get,
        update
    };
};
