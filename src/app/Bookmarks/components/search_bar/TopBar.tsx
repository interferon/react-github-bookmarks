import React, { CSSProperties } from 'react';
import Select from 'react-select';
import { BoardItem } from 'src/app/typings/bookmarks_typings';
import styled from 'styled-components';
import { SearchIcon } from '../app_icons/icons';
import { ListItem } from './ListItem';

type SearchBarProps = {
    on_search: (text: string) => void,
    status: 'loading' | 'none',
    items: BoardItem[],
    is_item_added: (id: BoardItem) => boolean
    on_add_to_board: (item: BoardItem) => void
};

const Bar = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: white;
    display: flex;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
    top: 0;
    left: 0;
    position: fixed;
    right: 0;
    z-index: 30;
    margin-bottom: 1.5rem;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    margin: 0 auto;
`;

const Logo = styled.div`
    font-size: 20px;
    heigth: 100%;
    display: flex;
    align-items: center;
    margin-right: 20px;
    font-weight: 400;
`;

const menu_style: CSSProperties = {
    boxShadow: "0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)",
    top: "88%",
    left: "20%",
    border: "1px solid lightgrey",
    borderTop: 'none',
    backgroundColor: "white",
    borderRadius: '2px',
    marginBottom: '8px',
    marginTop: '8px',
    position: 'absolute',
    width: '50%',
    zIndex: 1,
    overflowY: 'hidden'
};

const menu_list_style: CSSProperties = {
    maxHeight: 650,
    overflowY: 'auto',
    paddingBottom: '25px',
    paddingTop: '0px',
    position: 'relative',
    boxSizing: 'border-box'
}

export const TopBar = ({is_item_added, items, on_add_to_board, on_search, status}: SearchBarProps): JSX.Element => {

    return (
        <Bar>
            <SearchContainer>
                <SearchIcon id='search_icon'/>
                <Select<BoardItem>
                    components={
                        {
                            DropdownIndicator: () => null,
                            IndicatorSeparator: () => null
                        }
                    }
                    placeholder={'Search...'}
                    cacheOptions={true}
                    getOptionLabel={i => i.name}
                    formatOptionLabel={
                        (option) => 
                            <ListItem
                                key={option.id}
                                item={option}
                                is_checked={is_item_added(option)}
                                on_add={() => on_add_to_board(option)}
                            />
                    }
                    isOptionDisabled={option => is_item_added(option)}
                    defaultMenuIsOpen={false}
                    noOptionsMessage={
                        ({inputValue}) => {
                            if(inputValue.length > 2){
                                return `Nothing found for ${inputValue}`
                            };
                            if(inputValue.length > 0 && inputValue.length < 3){
                                return `Type at least 3 chars`
                            }
                            return null;
                        }
                    }
                    isClearable={false}
                    value={null}
                    loadingMessage={() => 'Searching repos...'}
                    styles={{
                        control: () => ({border: 'none', display: "flex", fontSize: 25}),
                        container: () => ({width: "100%"}),
                        menu: () => (menu_style),
                        menuList: () => (menu_list_style),
                        option: () => ({width: "100%", boxSizing: "border-box"})
                    }}
                    options={items}
                    isLoading={status === 'loading'}
                    onChange={(value: any) => { on_add_to_board(value)}}
                    onInputChange={on_search}
                />
            </SearchContainer>
            <Logo><span>{"Github Bookmarks"}</span></Logo>
        </Bar>
    );
};
