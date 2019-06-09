export const parseJSONSafe = <T extends Object = Object>(text: string, _default = {}): T => {
    try {
        return JSON.parse(text);
    }
    catch (e) {
        return _default as T;
    }
};