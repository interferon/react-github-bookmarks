import React from 'react';
import { BoardIcon } from '../../app_icons/icons';
import { Item } from 'src/app/typings/bookmarks_typings';
import TimeAgo from 'react-timeago';
import { FlexCont, DescriptionSmall } from './list_item_components';
import { abbreviateNumber } from '../../../../helpers/abbreviate_number';


type IType = "issues" | "stargazers_count" | "license" | "last_updated";

type Props = {
    item: Item;
    include: IType[]
};

const item_type_to_renderer: Record<IType, (item: Item) => JSX.Element> = {
    issues: (item) => <DescriptionSmall key="issues">{`${abbreviateNumber(item.open_issues_count)} issues need help`}</DescriptionSmall>,
    last_updated: (item) =>
        <DescriptionSmall key="last_updated">
            <span style={{marginRight: "5px"}}>{"Updated"}</span>
            <TimeAgo date={item.updated_at} />
        </DescriptionSmall>,
    license: (item) => <DescriptionSmall key="license">{item.license ? `${item.license.name}`: ''}</DescriptionSmall>,
    stargazers_count: (item) =>
        <DescriptionSmall key="stargazers_count">
            <BoardIcon type="star" size="small"/>
            {abbreviateNumber(item.stargazers_count)}
        </DescriptionSmall>
}

export const ItemDescriptionFooter = ({ item, include}: Props): JSX.Element => {
    return <FlexCont>
        {
            include.map(
                type => item_type_to_renderer[type](item)
            )
        }
    </FlexCont>;
};
