import React from 'react';
import { Unpacked } from 'src/app/helpers/typings';
import styled from 'styled-components';
import { Board } from '../board/Boards';
import { PlusIcon, AddedIcon } from '../icons/PlusIcon';
import * as R from 'ramda';


type Item = Unpacked<Board['items']>;

type ItemsListProps = {
    items: Item[],
    added_to_board_ids: Item['id'][]
    on_add_to_board: (item: Item) => void
}

export const ItemsList  = (props: ItemsListProps) : JSX.Element =>  {
    const renderItem = (item: Item, index: number) => {
        return <SearchItem key={index}>
            <label>
                {item.name}
            </label>
            {
                R.includes(item.id, props.added_to_board_ids)
                    ? <AddedIcon id={item.id}/>
                    : <PlusIcon id={item.id} on_click={() => props.on_add_to_board(item)}/>
            }
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