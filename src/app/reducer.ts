// @flow
import { update } from './helpers/update';
import { Board } from './Bookmarks/components/board/Boards';
import { Unpacked } from './helpers/typings';


export type BookmarkState = {
    boards_settings: {
        boards: Board[],
        new_board_name: string,
    },
    search_query: string,
    items: Unpacked<Board['items']>[];
    operation: {
        type: "search" | "add_new_board" | "none"
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
        type : 'ADD_ITEM_TO_BOARD',
        item: Unpacked<Board['items']>
        board_id: string
    } |
    {
        type : 'SET_NEW_BOARD_NAME',
        text: string
    } |
    {
        type : 'SET_OPERATION_STATE',
        params : BookmarkState['operation']
    };

const initialBookmarkState : BookmarkState = {
    boards_settings: {
        boards: [],
        new_board_name: ''
    },
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
        case 'ADD_ITEM_TO_BOARD':
            const board = state.boards_settings.boards.find(b => b.id === action.board_id);
            if (board) {
                const upd_board = update(board, {items: board.items.concat(action.item)})
                return update(
                    state,
                    {
                        boards_settings:
                            update(
                                state.boards_settings,
                                {
                                    boards: state.boards_settings.boards.filter(b => b.id !== upd_board.id).concat(upd_board)
                                }
                            )
                    });
            }
            return state;
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
        default:
            return state;
    }
}