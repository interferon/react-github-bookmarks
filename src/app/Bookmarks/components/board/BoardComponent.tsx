import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { RemoveIcon } from '../app_icons/icons';
import { swap } from '../../../helpers/ramda-helpers';
import { update } from '../../../helpers/update';
import { BoardItemComponent } from "./BoardItem";
import * as R from 'ramda';
import styled from 'styled-components';
import { Board, BoardItem, DragItem } from 'src/app/typings/bookmarks_typings';

const BoardCont = styled.div`border: 1px solid black;`
const ItemsList = styled.ul`min-height: 50px`
const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    allign-items: center;
`;

type RenderBoardProps = {
    handlers: {
        on_board_remove: (id: Board['id']) => void,
        on_board_item_remove: (a : {board_id: Board['id'], item_id: BoardItem['id']}) => void
        on_item_changed_board: (a : {from_board_id: Board['id'], to_board_id: Board['id'], item_id: BoardItem['id']}) => void,
        on_board_items_sort: (board: Board) => void
    },
    board: Board
};

export const BoardComponent = ({ handlers, board }: RenderBoardProps): JSX.Element => {
    const [board_items, setBoardItems] = useState(board.items);
    const [{ canDrop }, drop] = useDrop<DragItem, any, any>({
        accept: 'board_item',
        drop: (i) => handlers.on_item_changed_board({ from_board_id: i.board_id, item_id: i.id, to_board_id: board.id }),
        canDrop: (item) => item.board_id !== board.id,
        collect: (monitor) => ({ isOver: monitor.isOver(), canDrop: monitor.canDrop() })
    });
    useEffect(() => setBoardItems(board.items), [board]);
    const sort_board_items = (id: string, atIndex: number): void => {
        const moved_item_index = R.findIndex(_ => _.id === id, board_items);
        const updated_items = swap(moved_item_index, atIndex, board_items);
        setBoardItems(updated_items);
        handlers.on_board_items_sort(update({ items: updated_items }, board));
    };
    return (<BoardCont key={board.id}>
        <FlexContainer>
            <label>{board.title}</label>
            <RemoveIcon on_click={(id) => handlers.on_board_remove(id)} id={board.id} />
        </FlexContainer>
        <ItemsList innerRef={drop} style={canDrop ? { backgroundColor: "yellow" } : {}}>
            {board_items.map((board_item, i) => <BoardItemComponent key={board_item.id} index={i} item={board_item} board_id={board.id} on_item_remove={(item_id) => handlers.on_board_item_remove({
                board_id: board.id,
                item_id
            })} on_item_sort={sort_board_items} />)}
        </ItemsList>
    </BoardCont>);
};
