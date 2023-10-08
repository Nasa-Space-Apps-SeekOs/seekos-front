import axios from 'axios';
import { createStorage } from '../storage';

const storage = createStorage();

const makeAuth = () => {
    const token = storage.getData().token;
    return token ? `Bearer ${token}` : '';
};

export const http = () =>
    axios.create({
        headers: {
            Authorization: makeAuth()
        }
    });
