import React from 'react';
import Select from 'react-select';
import { Item } from 'src/app/typings/bookmarks_typings';
import { BIcon } from '../app_icons/icons';
import { ListItem } from './ListItem';
import { select_styles } from './select_styles';
import { Bar, SearchContainer, Logo } from './components';

export type SearchBarProps = {
    on_search: (text: string) => void;
    status: 'loading' | 'none';
    items: Item[];
    is_item_added: (id: Item) => boolean;
    on_add_to_board: (item: Item) => void;
};

export const TopBar = ({is_item_added, items, on_add_to_board, on_search, status}: SearchBarProps): JSX.Element => {

    return (
        <Bar>
            <SearchContainer>
                <BIcon size="large" type="search"/>
                <Select<Item>
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
                    styles={select_styles}
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
