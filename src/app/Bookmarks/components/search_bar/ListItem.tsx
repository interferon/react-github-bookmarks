import React from 'react';
import { AddedIcon, PlusIcon, StarIcon} from '../app_icons/icons';
import { BoardItem } from 'src/app/typings/bookmarks_typings';
import styled from 'styled-components';
import TimeAgo from 'react-timeago'

type ListItemProps = {
    item: BoardItem;
    is_checked: boolean;
    on_add: () => void;
}

const ItemCont = styled.div`
    flex-direction: column;
    padding: 40px;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    display: flex;
`;

const LinkCont = styled.div`
    padding: 10px;
    display-flex;
`;

const Link = styled.a`
`;

const FlexContSplitted = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Description = styled.div`
    padding: 10px;
    font-size: 12px;
`

const DescriptionSmall = styled.div`
    display: flex;
    margin-right: 8px;
    font-size: 14px;
`;

const FlexCont = styled.div`
    padding: 12px;
    display: flex;
`

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
           <Description> { item.description } </Description>
            {
                is_checked
                    ? <AddedIcon id={item.id} />
                    : <PlusIcon id={item.id} on_click={() => on_add()} />
            }
        </FlexContSplitted>
        <FlexCont>
            <DescriptionSmall>{item.license ? item.license.name: "MIT Licence"}</DescriptionSmall>
            <DescriptionSmall>
                <TimeAgo date={item.updated_at}/>
            </DescriptionSmall>
            <DescriptionSmall>{`${item.open_issues_count} issues need help`}</DescriptionSmall>
            <DescriptionSmall>
                    <StarIcon id=''/>
                    {
                        item.stargazers_count
                    }
            </DescriptionSmall>
        </FlexCont>
    </ItemCont>;
};
