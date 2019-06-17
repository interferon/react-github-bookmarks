import React, { useEffect } from 'react';
import { useDrag, useDrop, useDragLayer } from 'react-dnd';
import { DragItem, Item } from 'src/app/typings/bookmarks_typings';
import { BoardItem } from './BoardItem';
import { getEmptyImage } from 'react-dnd-html5-backend';

type BoardItemComponentProps = {
    on_item_remove: (id: string) => void,
    item: Item,
    index: number,
    on_item_sort: (item_id: Item['id'], to: number) => void,
    on_drop: () => void
};

export const BoardItemComponent = ({ on_item_remove, item, index, on_item_sort, on_drop}: BoardItemComponentProps): JSX.Element => {
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
    const [{ isDragging }, drag, preview] = useDrag<DragItem, any, any>(
        {
            item: { id: item.id, type: 'board_item', index },
            collect: (monitor) => ({
                isDragging: monitor.getItem() ? monitor.getItem().id === item.id : false
            })
        }
    );

    useEffect(() => { preview(getEmptyImage(), { captureDraggingState: true })}, [])

    return (
        <BoardItem
            key={item.id}
            add_ref={(node) => drag(drop(node))}
            is_dragging={isDragging}
            item={item}
            on_item_remove={on_item_remove}
        />
    );
};
