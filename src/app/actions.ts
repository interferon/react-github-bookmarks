import { BookmarksActions, BookmarkState } from "./reducer";
import { search_repositories as search_items } from "./git_hub_api/search_repos";
import { Board, BoardItem} from "./Bookmarks/components/board/Boards";
import { Unpacked } from "./helpers/typings";
import { getSavedBoards, saveBoard, removeBoardById, removeBoardItem } from "./storage/db";
import { update } from "./helpers/update";
import { generate_board_id } from "./helpers/generateBoardId";

export type BookmarksDispatch = (a: BookmarksActions) => void
type ActionReturnType = (dispatch: BookmarksDispatch) => void;

export const search_repos = (query: string): ActionReturnType =>
    (dispatch: BookmarksDispatch): void => {
        set_operation_state({
            message: '',
            state: "in_progress",
            type: 'search'
        })(dispatch);

        search_items({ token: '' }, query)
            .then(
                reposE => {
                    reposE.fold(
                        (err) => {
                            set_operation_state({
                                message: err.message,
                                state: "fail",
                                type: 'search'
                            });
                        },
                        (repos) =>
                            dispatch({
                                type: 'SHOW_ITEMS',
                                items: repos.filter(r => r.name.includes(query)),
                                query
                            })
                    )
                }
            )
    };

export const add_new_board = (data: {title: string}): ActionReturnType => 
    (dispatch: BookmarksDispatch): void => {
       
        const new_board = {
            id: generate_board_id(),
            items: [],
            title: data.title
        };

        saveBoard(new_board).then(saved => dispatch({ type: "ADD_NEW_BOARD", board: saved }));
    };

export const change_new_board_title = (text: string): ActionReturnType =>
    (dispatch: BookmarksDispatch): void => {
        dispatch({
            type: "SET_NEW_BOARD_NAME",
            text
        })
    };

export const add_item_to_board = (item: Unpacked<Board['items']>, board: Board): ActionReturnType =>
    (dispatch: BookmarksDispatch): void => {
        set_operation_state({
            message: 'Saving boards',
            state: "in_progress",
            type: 'save_item'
        })(dispatch);

        saveBoard(update({ items: board.items.concat(item) }, board))
            .then(
                board =>
                    dispatch({
                        type: 'UPDATE_BOARDS',
                        boards: [board]
                    })
            )
        
    };

export const load_boards = (): ActionReturnType =>
    (dispatch: BookmarksDispatch): void => {
        set_operation_state({
            message: 'Loading boards',
            state: "in_progress",
            type: 'load_boards'
        })(dispatch);

        getSavedBoards().then(boards => dispatch({ type: 'SET_BOARDS', boards }));
    };

export const remove_board = (id: string): ActionReturnType => 
    (dispatch: BookmarksDispatch): void => {
        set_operation_state({
            message: "Removing board",
            state: 'in_progress',
            type: "none"
        });

        removeBoardById(id).then(
            boards => dispatch({ type: 'SET_BOARDS', boards })
        );

    };

export const remove_board_item = (params: {board_id: string, item_id: string}): ActionReturnType => 
    (dispatch: BookmarksDispatch): void => {
        set_operation_state({
            message: "Removing board item",
            state: 'in_progress',
            type: "none"
        })(dispatch);

        removeBoardItem(params).then(boards => dispatch({ type: 'SET_BOARDS', boards }));

    };

export const set_operation_state = (params: BookmarkState['operation']): ActionReturnType => 
    (dispatch: BookmarksDispatch) => {
        dispatch({
            type: "SET_OPERATION_STATE",
            params
        });
    };

export const clear_search_result = (query: string) => 
    (dispatch: BookmarksDispatch) => {
        dispatch({
            type: 'SHOW_ITEMS',
            items: [],
            query
        });
    }

export const change_item_board = (params: {from_board_id: Board['id'], to_board_id: Board['id'], item_id: BoardItem['id']}) =>
    (dispatch: BookmarksDispatch) => {
        console.log(params)
        // dispatch({ type: 'SET_BOARDS', boards : []})
    }

export const sort_board_items = (params: {board_id: Board['id'], order: BoardItem['id'][]}) =>
    (dispatch: BookmarksDispatch) => {
        console.log(params)
        // dispatch({ type: 'SET_BOARDS', boards : []})
    }
