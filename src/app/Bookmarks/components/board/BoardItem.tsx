import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { RemoveIcon } from '../app_icons/icons';
import styled from 'styled-components';
import { BoardItem, Board, DragItem } from 'src/app/typings/bookmarks_typings';


const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export type BoardItemProps = {
    on_item_remove: (id: string) => void,
    item: BoardItem,
    index: number,
    on_item_sort: (item_id: BoardItem['id'], to: number) => void,
    on_drop: () => void
};

export const BoardItemComponent = ({ on_item_remove, item, index, on_item_sort, on_drop}: BoardItemProps): JSX.Element => {
    // hook for sorting
    const [_, drop] = useDrop<DragItem, any, any>(
        {
            accept: "board_item",
            canDrop: () => true,
            hover: (dragged_item) => {
                if (dragged_item.id !== item.id) {
                    on_item_sort(dragged_item.id, index);
                }
            },
            drop: () => {
                on_drop()
            }
        }
    );

    // hook for dragging
    const [{ isDragging }, drag] = useDrag<DragItem, any, any>(
        {
            item: { id: item.id, type: 'board_item', index },
            collect: (monitor) => ({
                isDragging: monitor.getItem() ? monitor.getItem().id === item.id : false
            })
        }
    );

    return (
        <FlexContainer key={item.id}  innerRef={node => drag(drop(node))}>

            <div style={{ opacity: isDragging ? 0.08 : 1 }}>
                {item.name}
            </div>

            <RemoveIcon
                on_click={(id) => on_item_remove(id)}
                id={item.id}
            />

        </FlexContainer>
    );
};
