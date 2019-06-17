import React from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';
import { DragItem, Item } from 'src/app/typings/bookmarks_typings';
import { BoardItem } from './BoardItem';
import merge from 'ramda/es/merge';


function getItemStyles(
    initialOffset: XYCoord | null,
    currentOffset: XYCoord | null
) {
    if (!initialOffset || !currentOffset) {
        return {
            display: "none"
        };
    }

    let { x, y } = currentOffset;

    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform
    };
}

export const CustomDragLayer = (props: {get_item_by_id: (id: string) => Item}) => {
    const {
        initialOffset,
        currentOffset,
        isDragging,
        item
    } = useDragLayer(
        monitor =>
            ({
                item: monitor.getItem(),
                itemType: monitor.getItemType(),
                initialOffset: monitor.getInitialSourceClientOffset(),
                currentOffset: monitor.getSourceClientOffset(),
                isDragging: monitor.isDragging()
            })
    );


    if (!isDragging) {
        return null
    };
    
    return (
        <div style={getItemStyles(initialOffset, currentOffset)}>
            <BoardItem
                add_ref={() => {}}
                is_dragging={false}
                item={props.get_item_by_id(item.id)}
                on_item_remove={() => {}}
            />
        </div>
    )
}