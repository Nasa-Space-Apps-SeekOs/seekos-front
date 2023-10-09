import { User } from '../models/api/user';

export interface AppDataStorage {
    user: User;
    token: string;
    lastManualPrinterAddress: string;
}

const STORAGE_KEY = 'app-data';
let data: Partial<AppDataStorage> = {};

export const createStorage = () => {
    const init = (): void => {
        loadData();
    };

    const saveData = (): void => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    const loadData = (): void => {
        data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    };

    const clearData = (): void => {
        data = {};
        saveData();
    };

    const getData = (): Partial<AppDataStorage> => {
        return data;
    };

    const setData = (newData: Partial<AppDataStorage>): void => {
        data = newData;
    };

    return {
        init,
        saveData,
        loadData,
        clearData,
        getData,
        setData
    };
};

createStorage().init();
