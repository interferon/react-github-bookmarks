import { BookmarksActions, BookmarkState } from "./reducer";
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
        set_operation_state({
            message: '',
            state: "in_progress",
            type: 'search'
        })(dispatch);

        search_repositories({ token: '' }, query)
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
                                type: 'SHOW_REPOS',
                                items: repos.filter(r => r.name.includes(query)),
                                query
                            })
                    )
                }
            )
        // if (query.length >= 2) {
        //     set_operation_state({
        //         message: '',
        //         state: "in_progress",
        //         type: 'search'
        //     });
            
        //     } else {
        //         dispatch({
        //             type: 'SHOW_REPOS',
        //             items: [],
        //             query
        //         });
        //         set_operation_state({
        //             message: 'Type at least 2 characters',
        //             state: "success",
        //             type: 'search'
        //         });
        //     }
    };

export const add_new_board = (data: {title: string}): ActionReturnType => 
    (dispatch: BookmarksDispatch): void => {
       
        const new_board = {
            id: generate_board_id(),
            items: [],
            title: data.title
        };

        saveBoard(new_board).then(saved => dispatch({ type: "ADD_NEW_BOARD", board: saved }));
            // : set_operation_state({
            //     message: "Please add board name",
            //     state: 'fail',
            //     type: "add_new_board"
            // }); 
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
            type: 'SHOW_REPOS',
            items: [],
            query
        });
    }