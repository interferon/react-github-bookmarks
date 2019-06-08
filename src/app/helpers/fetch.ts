import {either} from 'fp-ts';
import { Either } from 'fp-ts/lib/Either';

export type BookmarksError = {
    type : "unknown_error" | "api_error",
    message: string
}


export function fetch_json<T>(url: string, init: RequestInit) : Promise<Either<BookmarksError, T>> {

    return fetch(url, init)
        .then(
            resp => 
                resp.json().then(
                    data => 
                        `${resp.status}`.startsWith("2")
                            ? either.right<BookmarksError,  T>(data as T)
                            : either.left<BookmarksError,  T>({type : 'api_error', message : data.message || "Error has occured"})
                )
        )
}