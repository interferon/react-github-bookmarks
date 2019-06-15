import React from 'react';
import { BIcon } from '../app_icons/icons';
import { Item } from 'src/app/typings/bookmarks_typings';
import TimeAgo from 'react-timeago';
import { FlexCont, DescriptionSmall } from './list_item_components';

type Props = {
    item: Item;
    include: ("issues" | "stargazers_count" | "license" | "last_updated")[]
}

export const ListItemDescription = ({ item, include}: Props): JSX.Element => {
    return <FlexCont>
        {
            include.includes('license') && <DescriptionSmall>{item.license ? item.license.name : "MIT Licence"}</DescriptionSmall>
        }
        {
            include.includes('last_updated') &&
                <DescriptionSmall>
                    <TimeAgo date={item.updated_at} />
                </DescriptionSmall>
        }
        {
            include.includes('issues') && <DescriptionSmall>{`${item.open_issues_count} issues need help`}</DescriptionSmall>
        }
        {
            include.includes('stargazers_count') &&
                <DescriptionSmall>
                    <BIcon type="star" size="small"/>
                    {item.stargazers_count}
                </DescriptionSmall>
        }
    </FlexCont>;
};
