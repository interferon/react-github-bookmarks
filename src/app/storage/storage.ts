import { promise } from "../helpers/promise";

interface LocalStorage {
    load<Out>(key: string): Promise<Out>;
    save<In>(key: string, value: In): Promise<In>;
    remove(key: string): Promise<string>;
};



let load = <Out>(key: string): Promise<Out> => promise((resolve) => {
    let data = localStorage[key]
    resolve(
        <Out>(data ? JSON.parse(data) : null)
    )
})

let save = <In>(key: string, value: In): Promise<In> => promise<In>((resolve) => {
    if (value === null || value === undefined) {
        delete localStorage[key]
    }
    else {
        localStorage[key] = JSON.stringify(value)
    }
    resolve(value);
})

let remove = (key: string): Promise<string> => promise<string>((resolve) => {
    save(key, null).then(_ => resolve(key))
});

export const storage: LocalStorage = ({
    load,
    save,
    remove
});