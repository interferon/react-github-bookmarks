import React from 'react';
import { BoardItem } from 'src/app/typings/bookmarks_typings';
import styled from 'styled-components';
import { ListItem } from './ListItem';
import { useComponentVisible } from 'src/app/helpers/useComponentVisible';


type ItemsListProps = {
    items: BoardItem[],
    is_item_added: (id: BoardItem) => boolean
    on_add_to_board: (item: BoardItem) => void
};


const ItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    max-height: 200px;
    z-index: 30;
    background-color: white;
    overflow-y: scroll;
    position: absolute; 
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
    width: 800px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
    padding: 10px;
`

export const ItemsList  = (props: ItemsListProps) : JSX.Element =>  {
    const { ref, isComponentVisible } = useComponentVisible(true);
    
    return isComponentVisible
        ? <ItemsContainer ref={ref}>
                {
                    props.items.map(
                        (item, i) =>
                            <ListItem
                                key={i}
                                item={item}
                                is_checked={props.is_item_added(item)}
                                on_add={() => props.on_add_to_board(item)}
                            />
                    )
                }
            </ItemsContainer>
        : <div></div>
    ;
}