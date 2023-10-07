import { ScaleData } from '../models/api/scale-data';
import { http } from './config/http';
import { URLS } from './config/urls';

export const createScaleService = () => {
    const getData = (): Promise<ScaleData> => {
        return http()
            .get<any>(URLS.scale.getData())
            .then((response) => ({
                isNozzle1Active: !!response.data.BICO_1,
                isNozzle2Active: !!response.data.BICO_2,
                weight1: Number((response.data.PESO_1 / 10).toFixed(1)),
                weight2: Number((response.data.PESO_2 / 10).toFixed(1))
            }));
    };

    return {
        getData
    };
};
