declare module "redux-changes" {
    export const enableChangeHandling : any;
    export const handleChanges : <T>(a : Partial<T>) => Partial<T>;
    
}