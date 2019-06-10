import { BookmarksActions } from "./reducer";
import { search_repositories } from "./git_hub_api/search_repos";
import { Board } from "./Bookmarks/components/board/Boards";
import { Unpacked } from "./helpers/typings";
import { getSavedBoards, saveBoard, removeBoardById, removeBoardItem } from "./storage/db";
import { update } from "./helpers/update";
import { generate_board_id } from "./helpers/generateBoardId";

export type BookmarksDispatch = (a: BookmarksActions) => void
type ActionReturnType = (dispatch: BookmarksDispatch) => void;

export const search_repos = (query: string): ActionReturnType =>
    (dispatch: BookmarksDispatch): void => {
        dispatch({
            type: 'SET_OPERATION_STATE',
            params: {
                message: '',
                state: "in_progress",
                type: 'search'
            }
        });

        if (query.length >= 2) {
            search_repositories({ token: '' }, query)
                .then(
                    reposE => {
                        reposE.fold(
                            (err) => {
                                dispatch({
                                    type: 'SET_OPERATION_STATE',
                                    params: {
                                        message: err.message,
                                        state: "fail",
                                        type: 'search'
                                    }
                                })
                            },
                            (repos) =>
                                dispatch({
                                    type: 'SHOW_REPOS',
                                    items: repos.filter(r => r.name.includes(query)),
                                    query
                                })
                        )
                    }
                )
            } else {
                dispatch({
                    type: 'SHOW_REPOS',
                    items: [],
                    query
                });
                dispatch({
                    type: 'SET_OPERATION_STATE',
                    params: {
                        message: 'Type at least 2 characters',
                        state: "success",
                        type: 'search'
                    }
                })
            }
    };

export const add_new_board = (data: {title: string}): ActionReturnType => 
    (dispatch: BookmarksDispatch): void => {
        data.title.length
            ? Promise.resolve(
                {
                    type: "SET_OPERATION_STATE",
                    params: {
                        message: "Saving boards",
                        state: 'in_progress',
                        type: "add_new_board"
                    }
                } as BookmarksActions
            )
            .then(
                action => {
                    dispatch(action);

                    const new_board = {
                        id: generate_board_id(),
                        items: [],
                        title: data.title
                    };

                    saveBoard(new_board).then(saved => dispatch({ type: "ADD_NEW_BOARD", board: saved }));
                }
            )
            : dispatch({
                type: "SET_OPERATION_STATE",
                params: {
                    message: "Please add board name",
                    state: 'fail',
                    type: "add_new_board"
                }
            }) 
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
        dispatch({
            type: 'SET_OPERATION_STATE',
            params: {
                message: 'Saving boards',
                state: "in_progress",
                type: 'save_item'
            }
        });

        saveBoard(update({ items: board.items.concat(item) }, board)).then(
            board =>
                dispatch({
                    type: 'UPDATE_BOARDS',
                    boards: [board]
                })
        )
        
    };

export const load_boards = (): ActionReturnType =>
    (dispatch: BookmarksDispatch): void => {
        dispatch({
            type: 'SET_OPERATION_STATE',
            params: {
                message: 'Loading boards',
                state: "in_progress",
                type: 'load_boards'
            }
        });

        getSavedBoards().then(
            boards => 
                dispatch({
                    type: 'SET_BOARDS',
                    boards
                })
        );
    };

export const remove_board = (id: string): ActionReturnType => 
    (dispatch: BookmarksDispatch): void => {
        dispatch({
            type: "SET_OPERATION_STATE",
            params: {
                message: "Removing board",
                state: 'in_progress',
                type: "none"
            }
        });

        removeBoardById(id).then(
            boards => {
                dispatch({
                    type: 'SET_BOARDS',
                    boards
                })
            }
        )

    };

export const remove_board_item = (params: {board_id: string, item_id: string}): ActionReturnType => 
    (dispatch: BookmarksDispatch): void => {
        dispatch({
            type: "SET_OPERATION_STATE",
            params: {
                message: "Removing board item",
                state: 'in_progress',
                type: "none"
            }
        });

        removeBoardItem(params).then(
            boards => {
                dispatch({
                    type: 'SET_BOARDS',
                    boards
                })
            }
        )

    };
