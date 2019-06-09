import { BookmarksActions } from "./reducer";
import { search_repositories } from "./git_hub_api/search_repos";
import { Board } from "./Bookmarks/components/board/Boards";
import { Unpacked } from "./helpers/typings";

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
        })
        search_repositories({ token: '' }, query).then(
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
    };

export const add_new_board = (data: {title: string}): ActionReturnType => 
    (dispatch: BookmarksDispatch): void => {
        data.title.length
            ? dispatch({
                type: "ADD_NEW_BOARD",
                board: {
                    id: new Date().getTime().toString(),
                    items: [],
                    title: data.title
                }
            })
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


export const add_item_to_board = (item: Unpacked<Board['items']>, board_id: string): ActionReturnType =>
    (dispatch: BookmarksDispatch): void => {
        dispatch({
            type: "ADD_ITEM_TO_BOARD",
            board_id,
            item
        })
    };
