import React, { useRef, useState, useEffect } from 'react';
import { GithubRepo } from 'src/app/git_hub_api/search_repos';
import styled from 'styled-components';
import { pick } from 'ramda';
import { useDrag, useDrop} from 'react-dnd'
import { RemoveIcon, PlusIcon } from '../app_icons/icons';
import { swap } from '../../../helpers/ramda-helpers';
import * as R from 'ramda';
import { update } from '../../../helpers/update';

export type BoardItem = GithubRepo;

type DragItem = {
    index: number,
    id: string,
    board_id: string,
    type: 'board_item'
};

type BoardPlaceholderProps = {
    placeholder: string,
    new_board_name: string,
    on_board_add: () => void,
    on_new_board_name_change: (name: string) => void
};

type BoardItemProps = {
    on_item_remove: (id: string) => void,
    item: BoardItem,
    board_id: Board['id'],
    index: number,
    on_item_sort: (item_id: BoardItem['id'], to: number) => void
};

type RenderBoardProps = {
    handlers: Pick<BoardsProps['handlers'], 'on_board_remove' | 'on_board_item_remove' | 'on_item_changed_board' | 'on_board_items_sort'>,
    board: Board
}



const Placeholder = styled.div`display: flex;`;
const BoardCont = styled.div`border: 1px solid black;`
const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    allign-items: center;
`;

const ItemsList = styled.ul`min-height: 50px`

export type Board = {
    items: BoardItem[],
    title: string,
    id: string
};

export type BoardsProps = {
    boards: Board[],
    new_board_name: string
    handlers: {
        on_new_board_created: (b: {title: string}) => void,
        on_new_board_title_change: (board_title: string) => void,
        on_board_remove: (id: Board['id']) => void,
        on_board_item_remove: (a : {board_id: Board['id'], item_id: BoardItem['id']}) => void
        on_item_changed_board: (a : {from_board_id: Board['id'], to_board_id: Board['id'], item_id: BoardItem['id']}) => void,
        on_board_items_sort: (board: Board) => void
    }
};

const BoardItem = (data: BoardItemProps): JSX.Element => {
    const {board_id, on_item_remove, item, index, on_item_sort: moveCard} = data;

    const [, drop] = useDrop<DragItem, any, any>({
        accept: "board_item",
        canDrop: () => false,
        hover: (dragged) => {
            if (dragged.id !== item.id) {
                moveCard(dragged.id, index)
            }
        }
    })
    const [{isDragging}, drag] = useDrag<DragItem, any, any>(
        {
            item: { id: item.id, type: 'board_item', board_id, index: data.index},
            collect: monitor => ({ isDragging: monitor.isDragging() })
        }
    );
    return (
        <FlexContainer key={item.id} innerRef={node => drag(drop(node))}>
            <li style={{opacity: isDragging ? 0.1 : 1}}>{item.name}</li>
            <RemoveIcon on_click={(id) => on_item_remove(id)} id={item.id}/>
        </FlexContainer>
    );
};

const RenderBoard = ({ handlers, board }: RenderBoardProps): JSX.Element => {

    const [board_items, setBoardItems] = useState(board.items);

    const [{canDrop}, drop] = useDrop<DragItem, any, any>({
        accept: 'board_item',
        drop: (i) => handlers.on_item_changed_board({from_board_id: i.board_id, item_id: i.id, to_board_id: board.id}),
        canDrop: (item) => item.board_id !== board.id,
        collect: (monitor) => ({ isOver: monitor.isOver(), canDrop: monitor.canDrop()})
    });

    useEffect(
        () => setBoardItems(board.items),
        [board]
    )

    const sort_board_items = (id: string, atIndex: number): void => {
        const moved_item_index = R.findIndex(_ => _.id === id, board_items);
        const updated_items = swap(moved_item_index, atIndex, board_items);
        setBoardItems(updated_items);
        handlers.on_board_items_sort(update({items: updated_items} , board));
    };

    return (
        <BoardCont key={board.id}>
            <FlexContainer>
                <label>{board.title}</label>
                <RemoveIcon
                    on_click={(id) => handlers.on_board_remove(id)}
                    id={board.id}
                />
            </FlexContainer>
            <ItemsList innerRef={drop} style={canDrop ? {backgroundColor: "yellow"} : {}}>
                {
                    board_items.map(
                        (board_item, i) =>
                            <BoardItem
                                key={board_item.id}
                                index={i}
                                item={board_item}
                                board_id={board.id}
                                on_item_remove={
                                    (item_id) =>
                                        handlers.on_board_item_remove({
                                            board_id: board.id,
                                            item_id
                                        })
                                }
                                on_item_sort={sort_board_items}
                            />
                    )
                }
            </ItemsList>
        </BoardCont>
    );
};

const BoardPlaceholder = (props: BoardPlaceholderProps) => 
    <Placeholder>
        <input
            value={props.new_board_name}
            placeholder={props.placeholder}
            onChange={
                (e) => props.on_new_board_name_change(e.target.value)
            }
        />
        <PlusIcon id={''} on_click={() => props.on_board_add()} />
    </Placeholder>


export const Boards = (props: BoardsProps) => 
    <div>
        <h3>Boards</h3>
        <FlexContainer>
            {
                props.boards.map(
                    board =>
                        <RenderBoard
                            key={board.id}
                            board={board}
                            handlers={
                                pick(
                                    ['on_board_remove', 'on_board_item_remove', 'on_item_changed_board', 'on_board_items_sort'],
                                    props.handlers
                                )
                            }
                        />
                )
            }
            <BoardPlaceholder
                new_board_name={props.new_board_name}
                placeholder={'Enter Name'}
                on_board_add={() => props.handlers.on_new_board_created({title: props.new_board_name})}
                on_new_board_name_change={props.handlers.on_new_board_title_change}
            />
        </FlexContainer>
    </div>;
