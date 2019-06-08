export const debounce = <TFn extends Function>(func: TFn, wait: number, immediate: boolean): TFn => {
    let timeout : any;
    return (function (this: any) {
        let context = this, args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    }) as any as TFn;
}