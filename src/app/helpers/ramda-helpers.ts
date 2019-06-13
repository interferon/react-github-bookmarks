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

export const swap = <T>(index1: number, index2: number, list: T[]) : T[] => {
    if (index1 < 0 || index2 < 0 || index1 > list.length - 1 || index2 > list.length - 1) {
      return list // index out of bound
    }
    const value1 = list[index1]
    const value2 = list[index2]
    return R.pipe(
      R.set(R.lensIndex(index1), value2),
      R.set(R.lensIndex(index2), value1)
    )(list)
}