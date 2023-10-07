import { Operator } from '../models/api/operator';
import { http } from './config/http';
import { URLS } from './config/urls';

export const createOperatorService = () => {
    const getByRegistration = (registration: string): Promise<Operator> => {
        return http()
            .get<any>(URLS.api.operators.getByRegistration(registration))
            .then((response) => response.data);
    };

    return {
        getByRegistration
    };
};
