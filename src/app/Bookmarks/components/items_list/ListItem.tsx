import React from 'react';
import { AddedIcon, PlusIcon } from '../app_icons/icons';
import { BoardItem } from 'src/app/typings/bookmarks_typings';

type ListItemProps = {
    item: BoardItem;
    is_checked: boolean;
    on_add: () => void;
}

export const ListItem = ({is_checked, item, on_add} : ListItemProps): JSX.Element => {
    return <div>
        <label> {item.name}</label>
        {is_checked
            ? <AddedIcon id={item.id} />
            : <PlusIcon id={item.id} on_click={() => on_add()} />}
    </div>;
};
