// @flow

import axios from 'axios';
import { CONFIG_BASE_URL } from '../constants/config';

const instance = axios.create({
    baseURL: CONFIG_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

export const setAuthorization = (h: { [key: string]: any }) => instance.defaults.headers.common.Authorization = h;

function handleResponse(res: any): Promise<mixed> {
    return new Promise((resolve, reject) => {
        if (res.status === 200) {
            if (res.data.statusCode === 'OK') {
                return resolve(res.data.data);
            }
            return reject(res.data.message);
        }
        if (res.status !== 200) {
            return reject(new Error(res.statusText));
        }
        reject(new Error('Unknown Error'));
    });
}

function handleError(error: any): Promise<mixed> {
    return new Promise((resolve, reject) => {
        if (error.response && error.response.data) {
            return reject(error.response.data.message);
        }
        if (error.request && error.request.status === 401) {
            return reject(error.request.status);
        }
        return reject(error);
    });
}

export const get = (route: string, params?: { [key: string | number]: any }): Promise<any> => instance.get(route, { params }).then(handleResponse).catch(handleError);
export const post = (route: string, payload?: { [key: string | number]: any } = {}): Promise<any> => instance.post(route, payload).then(handleResponse).catch(handleError);
export const put = (route: string, payload?: { [key: string | number ]: any }): Promise<any> => instance.put(route, payload).then(handleResponse).catch(handleError);
export const del = (route: string): Promise<any> => instance.delete(route).then(handleResponse).catch(handleError);
