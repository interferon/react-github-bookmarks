import React from 'react';
import Select from 'react-select';
import { Item } from 'src/app/typings/bookmarks_typings';
import { select_styles } from './drop_down_styles';
import { ListItem } from '../search_list_item/ListItem';

type DropdownProps = {
    on_search: (text: string) => void;
    status: 'loading' | 'none';
    items: Item[];
    is_item_added: (id: Item) => boolean;
    on_add_to_board: (item: Item) => void;
};

export const DropDown = ({status, is_item_added, items, on_add_to_board, on_search}: DropdownProps): JSX.Element => {
    return <Select<Item>
        components={
            {
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null
            }
        }
        placeholder={'Search...'}
        cacheOptions={true}
        filterOption={(option, input) => option.label.includes(input)}
        getOptionLabel={i => i.name}
        formatOptionLabel={
            (option, label_meta) => 
                <ListItem
                    key={option.id}
                    item={option}
                    is_checked={is_item_added(option)}
                    on_add={() => on_add_to_board(option)}
                />
        }
        isOptionDisabled={option => is_item_added(option)}
        defaultMenuIsOpen={true}
        defaultOptions={false}
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
        pageSize={1}
        isClearable={false}
        value={null}
        loadingMessage={() => 'Searching repos...'}
        styles={select_styles}
        options={items}
        isLoading={status === 'loading'}
        onChange={(value: any) => { on_add_to_board(value)}}
        onInputChange={
            value => {
                items.filter(i => i.name.includes(value)).length === 0 && on_search(value)
            }
        }
    />
}