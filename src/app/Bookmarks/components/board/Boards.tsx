import React from 'react'
import { PlusIcon } from '../icons/PlusIcon';
import { GithubRepo } from 'src/app/git_hub_api/search_repos';


type BoardItem = GithubRepo;

export type Board = {
    items: BoardItem[],
    title: string,
    id: string
};

type BoardsProps = {
    boards: Board[],
    on_new_board: (b: {title: string}) => void,
    on_new_board_title_change: (board_title: string) => void,
    new_board_name: string,

};

const BoardItem = (item: BoardItem): JSX.Element => {
    return <div key={item.id}>{item.name}</div>
};

const Board = (board: Board): JSX.Element => {
    return <div key={board.id} style={{border: "1px solid black"}}>
        <label>{board.title}</label>
        {
            board.items.map(BoardItem)
        }
    </div>
};

const BoardPlaceholder = (props: {
    placeholder: string,
    new_board_name: string,
    on_board_add: () => void,
    on_new_board_name_change: (name: string) => void
}) => {
    return <div>
        <input
            defaultValue={props.new_board_name}
            placeholder={props.placeholder}
            onChange={
                (e) => props.on_new_board_name_change(e.target.value)
            }
        />
        <PlusIcon id={''} on_click={() => props.on_board_add()} />
    </div>
}

export const Boards = (props: BoardsProps) => {
    return (
        <div>
            <h3>Boards</h3>
            {
                props.boards.map(Board)
            }
            <BoardPlaceholder
                new_board_name={props.new_board_name}
                placeholder={'Enter Name'}
                on_board_add={() => props.on_new_board({title: props.new_board_name})}
                on_new_board_name_change={props.on_new_board_title_change}
            />
        </div>
    );
}