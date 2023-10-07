import { createContext, useContext } from 'react';
import { createAuthService } from '../services/auth.service';
import { createStorage } from '../core/storage';
import { LoginDto } from '../models/dtos/login.dto';
import { User } from '../models/api/user';
import { UserPermission } from '../util/enums/user-permission';

export interface IAuthProvider {
    isLogged(): boolean;
    getLoggedUser(): User | undefined;
    hasPermission(permissions: UserPermission[] | undefined): boolean;
    login(params: LoginDto): Promise<void>;
    logout(): Promise<void>;
}

interface AuthProviderProps {
    children: any;
}

const AuthContext = createContext<IAuthProvider | undefined>(undefined);

const AuthProvider = (props: AuthProviderProps) => {
    const storage = createStorage();
    const authService = createAuthService();

    const isLogged = (): boolean => {
        const user = getLoggedUser();
        return !!user?.username;
    };

    const getLoggedUser = (): User | undefined => {
        return storage.getData()?.user;
    };

    const hasPermission = (permissions: UserPermission[]): boolean => {
        if (!permissions) return true;

        const user = getLoggedUser();
        if (!user) return false;
        return permissions.some((permission) => user.permissions.includes(permission));
    };

    const login = (params: LoginDto): Promise<void> => {
        return new Promise((resolve, reject) => {
            authService
                .login(params)
                .then((response) => {
                    storage.setData(response);
                    storage.saveData();
                    resolve();
                })
                .catch((error) => reject(error));
        });
    };

    const logout = (): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                storage.clearData();
                resolve();
            }, 1000);
        });
    };

    return (
        <AuthContext.Provider
            value={{
                isLogged,
                getLoggedUser,
                hasPermission,
                login,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext)!;
