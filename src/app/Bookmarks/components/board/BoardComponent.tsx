import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { BIcon } from '../app_icons/icons';
import { swap } from '../../../helpers/ramda-helpers';
import { update } from '../../../helpers/update';
import { BoardItemComponent } from "./BoardItemComponent";
import * as R from 'ramda';
import styled from 'styled-components';
import { Board, Item, DragItem } from 'src/app/typings/bookmarks_typings';

const BoardContainer = styled.div`
    height: fit-content;
    color: #494949;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
    margin: 20px;
    border-radius: 5px;
    width: 400px;
`
const ItemsListContainer = styled.ul`
    background-color: #dddcdc;
    min-height: 50px;
    padding: 0px;
    margin: 0px;
`
const BoardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #8080805e;
    padding: 10px;
`;

const BoardLabel = styled.label`
    font-size: 25px;
    font-weight: bold;
`

const IconCont = styled.div`
    position: relative;
    top: -12px;
    left: 10px;
`

type RenderBoardProps = {
    handlers: {
        on_board_remove: (id: Board['id']) => void,
        on_board_item_remove: (a : {board_id: Board['id'], item_id: Item['id']}) => void
        on_item_changed_board: (a : {from_board_id: Board['id'], to_board_id: Board['id'], item_id: Item['id']}) => void,
        on_board_items_sort: (board: Board) => void
    },
    get_board_id_for_item: (id: Item['id']) => string
    board: Board
};

export const BoardComponent = ({ handlers, board, get_board_id_for_item}: RenderBoardProps): JSX.Element => {
    const [board_items, setBoardItems] = useState(board.items);

    const [_, drop] = useDrop<DragItem, void, { canDrop: boolean, isOver: boolean}>({
        accept: 'board_item',
        drop: (i) => {
            handlers.on_item_changed_board({ from_board_id: get_board_id_for_item(i.id), item_id: i.id, to_board_id: board.id })
        },
        hover: (i) => {
            const from_board_id = get_board_id_for_item(i.id);
            from_board_id !== board.id
                && R.findIndex(_ => _.id === i.id, board_items) === -1
                && handlers.on_item_changed_board({ from_board_id, item_id: i.id, to_board_id: board.id })
            
        },
        canDrop: (i) => get_board_id_for_item(i.id) !== board.id,
        collect: (monitor) => ({ isOver: monitor.isOver(), canDrop: monitor.canDrop() })
    });

    useEffect(() => setBoardItems(board.items), [board]);

    const sort_board_items = (id: string, atIndex: number): void => {
        const moved_item_index = R.findIndex(_ => _.id === id, board_items);
        const updated_items = swap(moved_item_index, atIndex, board_items);
        setBoardItems(updated_items);
    };

    return (
        <BoardContainer key={board.id} className={'board'}>
            <BoardHeader>
                <BoardLabel>{board.title}</BoardLabel>
                <IconCont>
                    <BIcon
                        on_click={() => handlers.on_board_remove(board.id)}
                        size='normal'
                        type="close"
                    />
                </IconCont>
            </BoardHeader>
            <ItemsListContainer innerRef={drop}>
                {
                    board_items.map(
                        (board_item, i) =>
                            <BoardItemComponent
                                key={board_item.id}
                                index={i}
                                item={board_item}
                                on_item_remove={
                                    (item_id) =>
                                        handlers.on_board_item_remove({
                                            board_id: board.id,
                                            item_id
                                        })
                                }
                                on_item_sort={sort_board_items}
                                on_drop={
                                    () => handlers.on_board_items_sort(update({ items: board_items }, board))
                                }
                            />
                    )
                }
            </ItemsListContainer>
        </BoardContainer>
    );
};
