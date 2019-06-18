import React from 'react';
import { Item } from 'src/app/typings/bookmarks_typings';
import styled from 'styled-components';
import { BoardIcon } from '../app_icons/icons';
import { DropDown } from './dropdown/DropDown';

export const Bar = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: white;
    display: flex;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.15);
    top: 0;
    left: 0;
    position: fixed;
    right: 0;
    z-index: 30;
    margin-bottom: 1.5rem;
    width: 100%;
`;

export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    margin-right: auto;
    margin-left: 50px;
`;

export const Logo = styled.div`
    color: #4b4b4b;
    font-size: 20px;
    heigth: 100%;
    display: flex;
    align-items: center;
    margin-right: 20px;
    font-weight: 400;
`;

export type SearchBarProps = {
    on_search: (text: string) => void;
    status: 'loading' | 'none';
    items: Item[];
    is_item_added: (id: Item) => boolean;
    on_add_to_board: (item: Item) => void;
};

export const TopBar = (props: SearchBarProps): JSX.Element => {

    return (
        <Bar>
            <SearchContainer>
                <BoardIcon size="normal" type="search"/>
                <DropDown
                    is_item_added={props.is_item_added}
                    items={props.items}
                    on_add_to_board={props.on_add_to_board}
                    on_search={props.on_search}
                    status={props.status}
                />
            </SearchContainer>
            <Logo><span>{"Github Bookmarks"}</span></Logo>
        </Bar>
    );
};
