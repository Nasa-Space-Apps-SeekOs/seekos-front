import { http } from '../core/http/http';
import { URLS } from '../core/http/urls';
import { Repository, RepositoryComment } from '../models/api/repository';
import { RepositoryDto } from '../models/dtos/repository.dto';
import { RepositoryFilter } from '../models/filters/repository-search.filter';

export interface RepositoryService {
    search(filter: RepositoryFilter): Promise<Repository[]>;
    getById(id: number): Promise<Repository>;
    update(id: number, dto: RepositoryDto): Promise<Repository>;
    create(dto: RepositoryDto): Promise<Repository>;
    getCommets(id: number): Promise<RepositoryComment[]>;
}

export const createRepositoryService = () => {
    const search = (filter: RepositoryFilter): Promise<Repository[]> => {
        return http()
            .get<any>(URLS.api.repositories.search(), {
                params: filter
            })
            .then((response) => response.data);
    };

    const getById = (id: number): Promise<Repository> => {
        return http()
            .get<any>(URLS.api.repositories.getById(id))
            .then((response) => response.data);
    };

    const getCommets = (id: number): Promise<RepositoryComment[]> => {
        return http()
            .get<any>(URLS.api.repositories.getCommets(id))
            .then((response) => response.data);
    }

    const update = (id: number, dto: RepositoryDto): Promise<Repository> => {
        return http()
            .put<any>(URLS.api.repositories.update(id), dto)
            .then((response) => response.data);
    };

    const create = (dto: RepositoryDto): Promise<Repository> => {
        return http()
            .post<any>(URLS.api.repositories.create(), dto)
            .then((response) => response.data);
    };

    return {
        search,
        getById,
        update,
        create,
        getCommets
    };
};
