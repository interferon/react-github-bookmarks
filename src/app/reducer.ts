// @flow
import { combineReducers } from 'redux-immutable'

const initial_state : BookmarksState = {

}

type BookmarksState = {

};

type BookmarksReducers = {
    search_bar: BookmarksState 
};

type BookmarkActions = {
    type : "LIST_CREATED",
    data : {
        
    }
}

export const reducer = combineReducers<BookmarksReducers, BookmarkActions>({
    search_bar : (state, action) => {
        return state || 0;
    }
})
