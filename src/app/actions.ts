import { BookmarksActions, BookmarkState } from "./reducer";
import { search_repositories as search_items } from "./git_hub_api/search_repos";
import { Unpacked } from "./helpers/typings";
import { getSavedBoards, saveBoard, removeBoardById, removeBoardItem, saveAllBoards } from "./storage/db";
import { update } from "./helpers/update";
import { generate_board_id } from "./helpers/generateBoardId";
import { reject } from "ramda";
import { upsertAllBy } from "./helpers/ramda-helpers";
import { Board, BoardItem } from "./typings/bookmarks_typings";

export type BookmarksDispatch = (a: BookmarksActions) => void
type ActionReturnType = (dispatch: BookmarksDispatch) => void;

export const search_repos = (query: string): ActionReturnType =>
    (dispatch: BookmarksDispatch): void => {
        dispatch(
            createOperationStateAction(
                {
                    message: '',
                    state: "in_progress",
                    type: 'search'
                } 
            )
        );

        search_items({ token: '' }, query)
            .then(
                reposE => {
                    reposE.fold(
                        (err) => {
                            dispatch(
                                createOperationStateAction(
                                    {
                                        message: err.message,
                                        state: "fail",
                                        type: 'search'
                                    }
                                )
                            );
                        },
                        (repos) => {
                            dispatch({
                                type: 'SHOW_ITEMS',
                                items: repos.filter(r => r.name.includes(query)),
                                query
                            });
                            dispatch(
                                createOperationStateAction(
                                    {
                                        message: "",
                                        state: 'success',
                                        type: "search"
                                    }
                                )
                            );
                        }
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
        dispatch(
            createOperationStateAction(
                {
                    message: 'Saving boards',
                    state: "in_progress",
                    type: 'add_item_to_board'
                }
            )
        );

        saveBoard(update({ items: board.items.concat(item) }, board))
            .then(
                board => {
                    dispatch({
                        type: 'UPDATE_BOARDS',
                        boards: [board]
                    });
                    dispatch(
                        createOperationStateAction(
                            {
                                message: 'Board added',
                                state: "success",
                                type: 'add_item_to_board'
                            }
                        )
                    );
                }
            )
        
    };

export const load_boards = (): ActionReturnType =>
    (dispatch: BookmarksDispatch): void => {
        dispatch(
            createOperationStateAction(
                {
                    message: 'Loading boards',
                    state: "in_progress",
                    type: 'load_boards'
                }
            )
        );

        getSavedBoards().then(
            boards => {
                dispatch({ type: 'SET_BOARDS', boards });
                dispatch(
                    createOperationStateAction(
                        {
                            message: 'Boards laoded',
                            state: "success",
                            type: 'load_boards'
                        }
                    )
                );
            }
        );
    };

export const remove_board = (id: string): ActionReturnType => 
    (dispatch: BookmarksDispatch): void => {
        dispatch(
            createOperationStateAction(
                {
                    message: "Removing board",
                    state: 'in_progress',
                    type: "board_remove"
                }
            )
        );

        removeBoardById(id).then(
            boards => {
                dispatch({ type: 'SET_BOARDS', boards });
                dispatch(
                    createOperationStateAction(
                        {
                            message: 'Board removed',
                            state: "success",
                            type: 'board_remove'
                        }
                    )
                );
            }
        );

    };

export const remove_board_item = (params: {board_id: string, item_id: string}): ActionReturnType => 
    (dispatch: BookmarksDispatch): void => {
        dispatch(
            createOperationStateAction(
                {
                    message: "Removing board item",
                    state: 'in_progress',
                    type: "item_remove"
                }
            )
        );

        removeBoardItem(params).then(
            boards => {
                dispatch({ type: 'SET_BOARDS', boards });
                dispatch(
                    createOperationStateAction(
                        {
                            message: "Removing board item",
                            state: 'success',
                            type: "item_remove"
                        }
                    )
                );
            }
        );

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

export const change_item_board = (params: {from_board_id: Board['id'], to_board_id: Board['id'], item_id: BoardItem['id']}, all_boards: Board[]) =>
    (dispatch: BookmarksDispatch) => {
        const from_board = all_boards.filter(b => b.id === params.from_board_id)[0];
        const to_board = all_boards.filter(b => b.id === params.to_board_id)[0];
        
        const items_to_move = from_board.items.filter(_ => _.id === params.item_id)
        const updated_boards = upsertAllBy(
            _ => _.id,
            [
                update({items: reject(_ => _.id === params.item_id, from_board.items)}, from_board),
                update({items: to_board.items.concat(items_to_move)}, to_board)
            ],
            all_boards
        );

        saveAllBoards(updated_boards).then(
            boards => {
                dispatch({ type: 'SET_BOARDS', boards});
                dispatch(
                    createOperationStateAction(
                        {
                            message: "Board changed",
                            state: 'success',
                            type: "board_change"
                        }
                    )
                );
            }
        )
    }

export const sort_board_items = (board: Board, all_boards: Board[]) =>
    (dispatch: BookmarksDispatch) => {
        const updated_boards = upsertAllBy(_ => _.id, [board], all_boards);
        saveAllBoards(updated_boards).then(
            boards => {
                dispatch({ type: 'SET_BOARDS', boards});
                dispatch(
                    createOperationStateAction(
                        {
                            message: "Board items sorted",
                            state: 'success',
                            type: "sort_board_items"
                        }
                    )
                );
            }
        );
    }

const createOperationStateAction = (params: BookmarkState['operation']) : BookmarksActions => ({
    type: "SET_OPERATION_STATE",
    params
})
