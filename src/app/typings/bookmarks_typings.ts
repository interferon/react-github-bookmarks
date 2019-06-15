import { GithubRepo } from "../git_hub_api/search_repos";

export type Item = GithubRepo;

export type DragItem = {
    index: number,
    id: string,
    type: 'board_item'
};

export type Board = {
    items: Item[],
    title: string,
    id: string
};