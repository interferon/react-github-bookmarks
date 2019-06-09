import { Board } from "../Bookmarks/components/board/Boards";
import { storage } from "./storage";

export const saveBoards = (boards: Board[]): Promise<Board[]> => {
    return storage.save('boards', boards);
};

export const getSavedBoards = (): Promise<Board[]> => {
    return storage.load<Board[] | null>('boards').then(
        bs => bs ? bs : [{id: "common_board", items: [], title: "Common board"}]
    );
};