import { ENV } from '../../env';

const { REACT_APP_API_BASE_URL: API_BASE_URL } = ENV;

export const URLS = {
    api: {
        auth: {
            login: () => `${API_BASE_URL}/v1/auth/login`
        },
        repositories: {
            search: () => `${API_BASE_URL}/repositories/`,
            getById: (id: number) => `${API_BASE_URL}/repositories/${id}/`,
            create: () => `${API_BASE_URL}/repositories/`,
            update: (id: number) => `${API_BASE_URL}/repositories/${id}/`,
            delete: (id: number) => `${API_BASE_URL}/repositories/${id}/`,
            getComments: (id: number) => `${API_BASE_URL}/repositories/${id}/comments/`,
            getMembers: (id: number) => `${API_BASE_URL}/repositories/${id}/members/`
        },
        keys: {
            getAll: () => `${API_BASE_URL}/keys/`
        }
    }
};
