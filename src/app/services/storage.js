// @flow

export default {
    get(key: string) {
        let obj = null;
        try {
            obj = JSON.parse(localStorage.getItem(key) || '{}');
        } catch (err) {
            console.log(`storage error ${ JSON.stringify(err) }`);
        }
        return obj;
    },
    set(key: string, obj: { [key: string]: any }) {
        return localStorage.setItem(key, JSON.stringify(obj));
    },
    clear(key: string) {
        localStorage.removeItem(key);
    },
    clearAll() {
        localStorage.clear();
    },
}