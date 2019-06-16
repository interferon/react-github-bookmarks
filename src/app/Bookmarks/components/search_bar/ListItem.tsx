import React from 'react';
import { BIcon} from '../app_icons/icons';
import { Item } from 'src/app/typings/bookmarks_typings';
import { ItemCont, LinkCont, Link, FlexContSplitted, Description } from './list_item_components';
import { ListItemDescription } from './ListItemDescription';

type ListItemProps = {
    item: Item;
    is_checked: boolean;
    on_add: () => void;
}

export const ListItem = ({is_checked, item, on_add} : ListItemProps): JSX.Element => {
    return <ItemCont>
        <LinkCont>
            <Link href={item.url} target="_blank">
                <span>{item.name}</span>
                /
                <span style={{fontWeight: 'bold'}}>{item.language}</span>
            </Link>
        </LinkCont>
        <FlexContSplitted>
           <Description type={'search'}> { item.description } </Description>
            {
                is_checked
                    ? <BIcon size="large" type="search"/>
                    : <BIcon size="normal" type="plus" on_click={() => on_add()} />
            }
        </FlexContSplitted>
        <ListItemDescription item={item} include={['license', 'last_updated', 'issues', 'stargazers_count']}/>
    </ItemCont>;
};


