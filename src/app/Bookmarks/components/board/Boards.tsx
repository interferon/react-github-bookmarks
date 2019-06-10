import React from 'react';
import { GithubRepo } from 'src/app/git_hub_api/search_repos';
import styled from 'styled-components';
import { PlusIcon, RemoveIcon } from '../icons/PlusIcon';
import { pick } from 'ramda';

type BoardItem = GithubRepo;

const Placeholder = styled.div`display: flex;`;
const BoardCont = styled.div`border: 1px solid black;`
const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    allign-items: center;
`;

export type Board = {
    items: BoardItem[],
    title: string,
    id: string
};

type BoardsProps = {
    boards: Board[],
    new_board_name: string
    on_new_board: (b: {title: string}) => void,
    on_new_board_title_change: (board_title: string) => void,
    on_board_remove: (id: string) => void,
    on_board_item_remove: (a : {board_id: string, item_id: string}) => void
};

const RenderBoardItem = (on_item_remove: (id: string) => void, item: BoardItem): JSX.Element => {
    return <FlexContainer key={item.id}>
        <li>{item.name}</li>
        <RemoveIcon
            on_click={
                (id) => on_item_remove(id)
            }
            id={item.id}
        />
    </FlexContainer>
};

const RenderBoard = (
    handlers: Pick<BoardsProps, 'on_board_remove' | 'on_board_item_remove'>,
    board: Board
): JSX.Element => {
    return <BoardCont key={board.id}>
        <FlexContainer>
            <label>{board.title}</label>
            <RemoveIcon
                on_click={(id) => handlers.on_board_remove(id)}
                id={board.id}
            />
        </FlexContainer>
        <ul>
            {
                board.items.map(
                    board_item =>
                        RenderBoardItem(
                            (item_id) => handlers.on_board_item_remove({board_id: board.id, item_id}),
                            board_item
                        )
                )
            }
        </ul>
    </BoardCont>
};

const BoardPlaceholder = (props: {
    placeholder: string,
    new_board_name: string,
    on_board_add: () => void,
    on_new_board_name_change: (name: string) => void
}) => {
    return <Placeholder>
        <input
            value={props.new_board_name}
            placeholder={props.placeholder}
            onChange={
                (e) => props.on_new_board_name_change(e.target.value)
            }
        />
        <PlusIcon id={''} on_click={() => props.on_board_add()} />
    </Placeholder>
};


export const Boards = (props: BoardsProps) => {
    return (
        <div>
            <h3>Boards</h3>
            <FlexContainer>
                {
                    props.boards.map(b => RenderBoard(pick(['on_board_remove', 'on_board_item_remove'], props), b))
                }
                <BoardPlaceholder
                    new_board_name={props.new_board_name}
                    placeholder={'Enter Name'}
                    on_board_add={() => props.on_new_board({title: props.new_board_name})}
                    on_new_board_name_change={props.on_new_board_title_change}
                />
            </FlexContainer>
        </div>
    );
}