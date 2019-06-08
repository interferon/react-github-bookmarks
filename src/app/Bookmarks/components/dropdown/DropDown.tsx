import React from 'react'
import styled from 'styled-components';
import { PlusIcon } from '../icons/PlusIcon';
import { Board } from '../board/Boards';
import { Unpacked } from 'src/app/helpers/typings';

type Item = Unpacked<Board['items']>;

type DropDownProps = {
    items: Item[],
    on_add_to_board: (item: Item) => void
}

export const SearchResult  = (props: DropDownProps) : JSX.Element =>  {
    const renderItem = (item: Item, index: number) => {
        return <div key={index}>
            <label>
                {item.name}
            </label>
            <PlusIcon id={`${item.id}`} on_click={() => props.on_add_to_board(item)}/>
        </div>
    };
    return <div>
        <h3>DropDown</h3>
        {
            props.items.map(renderItem)
        }
    </div>
}