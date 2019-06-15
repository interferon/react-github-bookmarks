// @flow
import { createStore } from 'redux';
import { middleware } from './middleware';
import { reducer, BookmarkState } from './reducer';


type LMStateChangeHandler<K extends keyof BookmarkState> = (
    state: BookmarkState,
    change: {value: BookmarkState[K], prevValue: BookmarkState[K], state: BookmarkState, prevState: BookmarkState}
) => void;

type Handlers = {[K in keyof BookmarkState]?: LMStateChangeHandler<K>};


export const store = createStore(reducer, middleware);