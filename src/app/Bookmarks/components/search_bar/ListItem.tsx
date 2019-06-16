import React from 'react';
import { BoardIcon} from '../app_icons/icons';
import { Item } from 'src/app/typings/bookmarks_typings';
import { ItemCont, FlexContSplitted, Description } from './list_item_components';
import { ItemDescriptionFooter } from './ItemDescriptionFooter';
import { ItemLinkCont } from './ItemLinkCont';

type ListItemProps = {
    item: Item;
    is_checked: boolean;
    on_add: () => void;
}

export const ListItem = ({is_checked, item, on_add} : ListItemProps): JSX.Element => {
    return <ItemCont>
        <ItemLinkCont
            login={item.owner.login}
            repo_name={item.name}
            url={item.url}
        />
        <FlexContSplitted>
           <Description type={'search'}> { item.description } </Description>
            {
                is_checked
                    ? <BoardIcon size="large" type="check"/>
                    : <BoardIcon size="normal" type="plus" on_click={() => on_add()} />
            }
        </FlexContSplitted>
        <ItemDescriptionFooter item={item} include={['license', 'last_updated', 'issues', 'stargazers_count']}/>
    </ItemCont>;
};


