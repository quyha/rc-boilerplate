// @flow

import { Cookies } from 'react-cookie';
import AES from 'crypto-js/aes';
import encUTF8 from 'crypto-js/enc-utf8';
import { KEY_CRYPT } from '../constants/config';

const cookies = new Cookies();

export default {
    get(key: string) {
        const valueCrypt = cookies.get(key);
        return valueCrypt ? JSON.parse(AES.decrypt(valueCrypt, KEY_CRYPT).toString(encUTF8)) : valueCrypt;
    },
    set(name: string, value: any, option?: { [key: string]: any } = { path: '/' }) {
        const valueCrypt = AES.encrypt(JSON.stringify(value), KEY_CRYPT).toString();
        return cookies.set(name, valueCrypt, option);
    },
    remove(name: string) {
        cookies.remove(name, { path: '/' });
        return true;
    }
}