// @flow
import { createStore } from 'redux';
import { middleware } from './middleware';
import { reducer, BookmarkState } from './reducer';
import { handleChanges, enableChangeHandling } from 'redux-changes';


type LMStateChangeHandler<K extends keyof BookmarkState> = (
    state: BookmarkState,
    change: {value: BookmarkState[K], prevValue: BookmarkState[K], state: BookmarkState, prevState: BookmarkState}
) => void;

type Handlers = {[K in keyof BookmarkState]?: LMStateChangeHandler<K>};

const handler = handleChanges<Handlers>({
    boards_settings: (state, change) =>  {
            return state;
    }
});

export const store = createStore(enableChangeHandling(reducer, handler), middleware);