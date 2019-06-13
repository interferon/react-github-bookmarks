import React from 'react';
import { Unpacked } from 'src/app/helpers/typings';
import styled from 'styled-components';
import * as R from 'ramda';
import { AddedIcon, PlusIcon } from '../app_icons/icons';
import { Board } from 'src/app/typings/bookmarks_typings';


type Item = Unpacked<Board['items']>;

type ItemsListProps = {
    items: Item[],
    is_item_added: (id: Item) => boolean
    on_add_to_board: (item: Item) => void
}

export const ItemsList  = (props: ItemsListProps) : JSX.Element =>  {
    const renderItem = (item: Item, index: number) => {
        return <SearchItem key={index}>
            <label>
                {item.name}
            </label>
            {
                props.is_item_added(item)
                    ? <AddedIcon id={item.id}/>
                    : <PlusIcon id={item.id} on_click={() => props.on_add_to_board(item)}/>
            }
        </SearchItem>
    };
    return <div>
        {
            props.items.map(renderItem)
        }
    </div>
}

export const SearchItem = styled.div`
    display: flex;
    align-items: center;
`;