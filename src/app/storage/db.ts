import { Board } from "../Bookmarks/components/board/Boards";
import { storage } from "./storage";
import { upsertBy } from "../helpers/ramda-helpers";
import { update } from "../helpers/update";
import { reject } from "ramda";
import { generate_board_id } from "../helpers/generateBoardId";
import * as R from 'ramda';

export const saveAllBoards = (boards: Board[]): Promise<Board[]> => storage.save('boards', boards);

export const saveBoard = (board: Board): Promise<Board> =>
    getSavedBoards().then(all_boards => saveAllBoards(upsertBy(b => b.id, board, all_boards)).then(_ => board));

export const removeBoardById = (board_id: string): Promise<Board[]> =>
    getSavedBoards().then(all_boards => saveAllBoards(reject(b => b.id === board_id, all_boards)));

export const removeBoardItem = (params: { board_id: string, item_id: string }): Promise<Board[]> =>
    getSavedBoards()
        .then(
            all_boards => {
                const [to_remove, rest] = R.partition(b => b.id === params.board_id, all_boards);
                return rest.concat(to_remove.map(b => update({ items: reject(_ => _.id === params.item_id, b.items) }, b)))
            }
        )
        .then(saveAllBoards);

export const getSavedBoards = (): Promise<Board[]> =>
    storage.load<Board[] | null>('boards')
        .then(bs => bs ? bs : saveAllBoards([{ id: generate_board_id(), items: [], title: "Common board" }]));
