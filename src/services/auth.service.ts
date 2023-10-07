import { UserToken } from '../models/api/user-token';
import { LoginDto } from '../models/dtos/login.dto';
import { http } from './config/http';
import { URLS } from './config/urls';

export const createAuthService = () => {
    const login = (dto: LoginDto): Promise<UserToken> => {
        return http()
            .post<any>(URLS.api.auth.login(), dto)
            .then((response) => response.data);
    };
    return {
        login
    };
};
