// @flow
import { Item } from './Bookmarks/components/dropdown/DropDown';
import { update } from './helpers/update';


export type BookmarkState = {
    search_query: string,
    items: Item[];
    operation: {
        type: "search" | "none"
        state: "success" | "fail" | "in_progress" | "none",
        message: string
    }
};

export type BookmarksActions = {
    query: string
    type : 'SHOW_REPOS',
    items: Item[]
} | {
    type : 'SET_OPERATION_STATE',
    params : BookmarkState['operation']
};
const initialBookmarkState : BookmarkState = {
    search_query: '',
    items: [],
    operation: {
        message: '',
        type: "none",
        state: 'none'
    }
    
};

export const reducer = (state: BookmarkState = initialBookmarkState, action: BookmarksActions): BookmarkState => {
    switch (action.type) {
        case 'SHOW_REPOS':
            return update(
                state,
                {
                    items: action.items,
                    search_query: action.query,
                    operation: {
                        message : '',
                        state : 'success',
                        type: 'search'
                    }
                }
            );
        case 'SET_OPERATION_STATE':
            return update(state, {operation : action.params});
        default:
            return state;
    }
}