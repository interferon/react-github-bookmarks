import React from 'react';
import { BoardIcon } from '../../app_icons/icons';
import { Item } from 'src/app/typings/bookmarks_typings';
import TimeAgo from 'react-timeago';
import { FlexCont, DescriptionSmall } from './list_item_components';
import { abbreviateNumber } from '../../../../helpers/abbreviate_number';


type IType = "issues" | "stargazers_count" | "license" | "last_updated";

type Props = {
    elem_type: "board" | "search"
    item: Item;
    include: IType[]
};

const item_type_to_renderer: Record<IType, (item: Item, elem_type: Props['elem_type']) => JSX.Element> = {
    issues: (item, elem_type) => <DescriptionSmall key="issues" type={elem_type}>{`${abbreviateNumber(item.open_issues_count)} issues need help`}</DescriptionSmall>,
    last_updated: (item, elem_type) =>
        <DescriptionSmall key="last_updated" type={elem_type}>
            <span style={{marginRight: "5px"}}>{"Updated"}</span>
            <TimeAgo date={item.updated_at} />
        </DescriptionSmall>,
    license: (item, elem_type) => <DescriptionSmall key="license" type={elem_type}>{item.license ? `${item.license.name}`: ''}</DescriptionSmall>,
    stargazers_count: (item, elem_type) =>
        <DescriptionSmall key="stargazers_count" type={elem_type}>
            <BoardIcon type="star" size="small"/>
            {abbreviateNumber(item.stargazers_count)}
        </DescriptionSmall>
}

export const ItemDescriptionFooter = ({ item, include, elem_type}: Props): JSX.Element => {
    return <FlexCont>
        {
            include.map(
                type => item_type_to_renderer[type](item, elem_type)
            )
        }
    </FlexCont>;
};
