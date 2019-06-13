import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { RemoveIcon } from '../app_icons/icons';
import styled from 'styled-components';
import { BoardItem, Board, DragItem } from 'src/app/typings/bookmarks_typings';


const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    allign-items: center;
`;

export type BoardItemProps = {
    on_item_remove: (id: string) => void,
    item: BoardItem,
    board_id: Board['id'],
    index: number,
    on_item_sort: (item_id: BoardItem['id'], to: number) => void
};

export const BoardItemComponent = (data: BoardItemProps): JSX.Element => {
    const { board_id, on_item_remove, item, index, on_item_sort: moveCard } = data;
    const [_, drop] = useDrop<DragItem, any, any>({
        accept: "board_item",
        canDrop: () => false,
        hover: (dragged) => {
            if (dragged.id !== item.id) {
                moveCard(dragged.id, index);
            }
        }
    });
    const [{ isDragging }, drag] = useDrag<DragItem, any, any>({
        item: { id: item.id, type: 'board_item', board_id, index: data.index },
        collect: monitor => ({ isDragging: monitor.isDragging() })
    });
    return (<FlexContainer key={item.id} innerRef={node => drag(drop(node))}>
        <li style={{ opacity: isDragging ? 0.1 : 1 }}>{item.name}</li>
        <RemoveIcon on_click={(id) => on_item_remove(id)} id={item.id} />
    </FlexContainer>);
};
