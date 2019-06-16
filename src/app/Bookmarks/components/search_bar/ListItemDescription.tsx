import React from 'react';
import { BIcon } from '../app_icons/icons';
import { Item } from 'src/app/typings/bookmarks_typings';
import TimeAgo from 'react-timeago';
import { FlexCont, DescriptionSmall } from './list_item_components';


type IType = "issues" | "stargazers_count" | "license" | "last_updated";

type Props = {
    item: Item;
    include: IType[]
};

const item_type_to_renderer: Record<IType, (item: Item) => JSX.Element> = {
    issues: (item) => <DescriptionSmall key="issues">{`${item.open_issues_count} issues need help`}</DescriptionSmall>,
    last_updated: (item) =>
        <DescriptionSmall key="last_updated">
            <span style={{marginRight: "5px"}}>{"Updated"}</span>
            <TimeAgo date={item.updated_at} />
        </DescriptionSmall>,
    license: (item) => <DescriptionSmall key="license">{`${item.open_issues_count} issues need help`}</DescriptionSmall>,
    stargazers_count: (item) =>
        <DescriptionSmall key="stargazers_count">
            <BIcon type="star" size="small"/>
            {item.stargazers_count}
        </DescriptionSmall>
}

export const ListItemDescription = ({ item, include}: Props): JSX.Element => {
    return <FlexCont>
        {
            include.map(
                type => item_type_to_renderer[type](item)
            )
        }
    </FlexCont>;
};
