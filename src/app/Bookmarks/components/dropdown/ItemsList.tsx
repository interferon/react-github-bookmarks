import React from 'react'
import styled from 'styled-components';
import { PlusIcon } from '../icons/PlusIcon';
import { Board } from '../board/Boards';
import { Unpacked } from 'src/app/helpers/typings';

type Item = Unpacked<Board['items']>;

type ItemsListProps = {
    items: Item[],
    on_add_to_board: (item: Item) => void
}

export const ItemsList  = (props: ItemsListProps) : JSX.Element =>  {
    const renderItem = (item: Item, index: number) => {
        return <SearchItem key={index}>
            <label>
                {item.name}
            </label>
            <PlusIcon id={`${item.id}`} on_click={() => props.on_add_to_board(item)}/>
        </SearchItem>
    };
    return <div>
        <h3>Search Items List</h3>
        {
            props.items.map(renderItem)
        }
    </div>
}

const SearchItem = styled.div`
    display: flex;
    align-items: center;
`;