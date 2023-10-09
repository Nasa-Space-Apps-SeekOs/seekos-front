import { http } from '../core/http/http';
import { URLS } from '../core/http/urls';
import { Tag } from '../models/api/tag';

export const createTagService = () => {
    const getAll = (): Promise<Tag[]> => {
        return http()
            .get<any>(URLS.api.keys.getAll())
            .then((response) => response.data);
    };

    return {
        getAll
    };
};
