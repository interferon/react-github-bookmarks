// @flow
import { update } from './helpers/update';
import { Board } from './Bookmarks/components/board/Boards';
import { Unpacked } from './helpers/typings';
import { upsertAllBy } from './helpers/ramda-helpers';
import * as R from 'ramda';

export type BookmarkState = {
    boards_settings: {
        boards: Board[],
        new_board_name: string,
    },
    search_query: string,
    items: Unpacked<Board['items']>[];
    operation: {
        type: "search" | "add_new_board" | "load_boards" | "save_item" | "none"
        state: "success" | "fail" | "in_progress" | "none",
        message: string
    }
};

export type BookmarksActions =
    {
        query: string
        type : 'SHOW_REPOS',
        items: Unpacked<Board['items']>[]
    } |
    {
        type : 'ADD_NEW_BOARD',
        board: Board
    } |
    {
        type : 'SET_NEW_BOARD_NAME',
        text: string
    } |
    {
        type : 'SET_OPERATION_STATE',
        params : BookmarkState['operation']
    } |
    {
        type : 'SET_BOARDS',
        boards: Board[]
    } | {
        type : "UPDATE_BOARDS",
        boards: Board[]
    }

const initialBookmarkState : BookmarkState = {
    boards_settings: {
        boards: [],
        new_board_name: ''
    },
    search_query: '',
    items: [],
    operation: {
        message: 'Loadind boards',
        type: "load_boards",
        state: 'in_progress'
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
            
        case 'ADD_NEW_BOARD':
            return update(
                state,
                {
                    boards_settings:
                        update(
                            state.boards_settings,
                            {
                                boards: state.boards_settings.boards.concat(action.board),
                                new_board_name: ''
                            }
                        )
                }
            );
        case 'SET_NEW_BOARD_NAME':
            return update(
                state,
                {
                    boards_settings:
                        update(
                            state.boards_settings,
                            {
                                new_board_name: action.text
                            }
                        )
                }
            );
        case 'SET_BOARDS':
            return update(
                state,
                {
                    boards_settings:
                        update(
                            state.boards_settings,
                            {
                                boards: action.boards
                            }
                        ),
                    operation: {
                        message: '',
                        state: 'success',
                        type: 'load_boards'
                    }
                }
            );
        case 'UPDATE_BOARDS':
            return R.assocPath(
                ['boards_settings', 'boards'],
                upsertAllBy(_ => _.id, action.boards, state.boards_settings.boards),
                update(
                    state,
                    {
                        operation: {
                            message: '',
                            state: 'success',
                            type: 'load_boards'
                        }
                    }
                )
            )
        default:
            return state;
    }
}