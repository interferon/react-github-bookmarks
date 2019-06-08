import { BookmarksActions } from "./reducer";
import { search_repositories } from "./git_hub_api/search_repos";

export type BookmarksDispatch = (a: BookmarksActions) => void


export const search_repos = (query: string) =>
    (dispatch: BookmarksDispatch) => {
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
                            items:
                                repos
                                    .filter(r => r.name.includes(query))
                                    .map(r => ({ id: `${r.id}`, label: r.name }))
                                ,
                            query
                        })
                )
            }
        )
    };
