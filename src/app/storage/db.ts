import { Board } from "../Bookmarks/components/board/Boards";
import { storage } from "./storage";
import { upsertBy } from "../helpers/ramda-helpers";

export const saveAllBoards = (boards: Board[]): Promise<Board[]> =>  storage.save('boards', boards);
export const saveBoard = (board: Board): Promise<Board> =>
    getSavedBoards()
        .then(all_boards => saveAllBoards(upsertBy(b => b.id, board, all_boards)).then(_ => board));

export const getSavedBoards = (): Promise<Board[]> =>
    storage.load<Board[] | null>('boards')
    .then(
        bs =>
            bs
                ? bs
                : saveAllBoards([{id: "common_board", items: [], title: "Common board"}])
    );
