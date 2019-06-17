// @flow
import { update } from './helpers/update';
import { Unpacked } from './helpers/typings';
import { upsertAllBy } from './helpers/ramda-helpers';
import * as R from 'ramda';
import { Board } from './typings/bookmarks_typings';
import { take } from 'ramda';

export type BookmarkState = {
    boards_settings: {
        boards: Board[],
        new_board_name: string,
    },
    search: {
        search_query: string,
        search_result: Unpacked<Board['items']>[];
        added_items_ids:  Unpacked<Board['items']>['id'][]
    }
    operation: {
        type: "search" | "add_new_board" | "load_boards" | "add_item_to_board"
            | "board_remove" | "item_remove" | "sort_board_items" | "board_change"
            | "change_new_board_title"
        ,
        state: "success" | "error" | "in_progress",
        message: string
    }
};

export type BookmarksActions =
    {
        query: string
        type : 'SHOW_ITEMS',
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
    search: {
        search_query: '',
        search_result: [],
        added_items_ids: []
    },
    operation: {
        message: 'Loadind boards',
        type: "load_boards",
        state: 'in_progress'
    }
    
};

export const reducer = (state: BookmarkState = initialBookmarkState, action: BookmarksActions): BookmarkState => {
    switch (action.type) {
        case 'SHOW_ITEMS':
            return update(
                {
                    search:
                        update(
                            {
                                search_result: take(200, (action.items.concat(state.search.search_result))),
                                search_query: action.query
                            },
                            state.search
                        )
                },
                state,
            );
        case 'SET_OPERATION_STATE':
            return update({operation : action.params}, state);
            
        case 'ADD_NEW_BOARD':
            return update(
                {
                    boards_settings: {
                        boards: state.boards_settings.boards.concat(action.board),
                        new_board_name: ''
                    }
                },
                state
            );
        case 'SET_NEW_BOARD_NAME':
            return update(
                {
                    boards_settings:
                        update(
                            {
                                new_board_name: action.text
                            },
                            state.boards_settings,
                        )
                },
                state
            );
        case 'SET_BOARDS':
            return update(
                {
                    boards_settings:
                        update(
                            {
                                boards: action.boards
                            },
                            state.boards_settings,
                        )
                    ,
                    search: update(
                        {
                            added_items_ids: R.chain(_ => _.items.map(i => i.id), action.boards),
                        },
                        state.search
                    )
                },
                state
            );
        case 'UPDATE_BOARDS':
            const updated_boards = upsertAllBy(_ => _.id, action.boards, state.boards_settings.boards);
            return R.assocPath(
                ['boards_settings', 'boards'],
                updated_boards,
                update(
                    {
                        search:
                            update(
                                {
                                    added_items_ids: R.chain(_ => _.items.map(i => i.id), updated_boards)
                                },
                                state.search
                            )

                    },
                    state
                )
            )
        default:
            return state;
    }
}