import * as R from 'ramda';
import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Board, DragItem, Item } from 'src/app/typings/bookmarks_typings';
import styled from 'styled-components';
import { swap } from '../../../helpers/ramda-helpers';
import { update } from '../../../helpers/update';
import { BoardIcon } from '../app_icons/icons';
import { BoardItemComponent } from "./BoardItemComponent";
import { merge } from 'ramda';

const BoardContainer = styled.div<{invisible: boolean}>`
    ${
        ({invisible}) =>
            ({
                "box-shadow": invisible ? "none" : "3px 1px 5px 0px rgba(0, 0, 0, 0.2)"
            })
    };
    height: fit-content;
    margin: 20px;
    width: 260px;
    border-radius: 5px;
`
const ItemsListContainer = styled.ul<{invisible: boolean}>`
    ${
        ({invisible}) =>
            ({
                "background-color": invisible ? "transparent" : " #eeeeee"
            })
    };
    min-height: 150px;
    padding: 0px;
    margin: 0px;
`
const BoardHeader = styled.div<{shadowed: boolean}>`
    ${
        ({shadowed}) =>
            ({
                "box-shadow": shadowed ? "3px 1px 5px 0px rgba(0, 0, 0, 0.2)": "none"
            })
    };
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border-radius: 5px;
`;

const BoardLabel = styled.label`
    color: #4b4b4b;
    font-size: 16px;
    font-weight: bold;
    display: block;
    width: 100%;
    padding: 10px;
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
    const invisible = board_items.length === 0;
    return (
        <BoardContainer key={board.id} className={'board'} invisible={invisible}>
            <BoardHeader shadowed={invisible}>
                <BoardLabel>{board.title}</BoardLabel>
                <BoardIcon
                    styles={{
                        position: "relative",
                        top: "-10px"
                        
                    }}
                    on_click={() => handlers.on_board_remove(board.id)}
                    size='normal'
                    type="close"
                />
            </BoardHeader>
            <ItemsListContainer innerRef={drop} invisible={invisible}>
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
