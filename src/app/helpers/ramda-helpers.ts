import * as R from 'ramda';
type upsertAllBy = <T, TID>(idFn: (i: T) => TID, updates: T[], list : T[]) => T[];
type upsertBy = <T, TID> (idFn: (i: T) => TID, update: T, list : T[]) => T[];

export let upsertAllBy: upsertAllBy = R.curryN(3, <T, TID>(fnId: (i: T) => TID, updates: T[], list: T[]) => {
    return updates.reduce(
        (acc, i) => upsertBy(fnId, i, acc),
        list
    )
});

export let upsertBy: upsertBy = R.curryN(3, <T, TID>(fnId: (i: T) => TID, update: T, list: T[]) => {
    return (
        (foundIndex) => foundIndex !== -1
            ? R.update(foundIndex, update, list)
            : R.append(update, list)
    )(
        R.findIndex(
            i => fnId(i) === fnId(update),
            list
        )
    );
});