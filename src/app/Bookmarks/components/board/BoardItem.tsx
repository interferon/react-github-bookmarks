import styled from 'styled-components';
import React from 'react';
import { LinkCont, Link, Description } from '../search_bar/list_item_components';
import { ListItemDescription } from '../search_bar/ListItemDescription';
import { Item } from 'src/app/typings/bookmarks_typings';
import { BIcon } from '../app_icons/icons';

const BoardItemTopContainer = styled.div<{
    is_dragging: boolean;
}> `
    ${
        (props) => props.is_dragging
            ? { opacity: 0 }
            : { opacity: 1 }
    }

    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    height: 200px;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
    background-color: white;
`;

const Header = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
`;

const Body = styled.div`
    display: flex;
    width: 100%;
    padding: 0px 15px 15px 15px;
    height: inherit;
`;

const InfoCont = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50px;
`;

const AvatarCont = styled.div`
    width: 30%;
    display: flex;
    justify-content: center;
`;

type BoardItemProps = {
    item: Item,
    on_item_remove: (id: string) => void,
    is_dragging: boolean,
    add_ref: (node: any) => void 
}

export const BoardItem = ({item, on_item_remove, is_dragging, add_ref}: BoardItemProps) => {
    return <BoardItemTopContainer
            is_dragging={is_dragging}
            key={item.id}
            innerRef={node => add_ref(node)}
        >
            <Header>
                <BIcon
                    on_click={() => on_item_remove(item.id)}
                    size='normal'
                    type="close"
                />
            </Header>
            <Body>
                <AvatarCont>
                    <Avatar src={item.owner.avatar_url}/>
                </AvatarCont>
                <InfoCont>
                    <LinkCont>
                        <Link href={item.url} target="_blank">
                            <span>{item.name}</span>
                            /
                            <span style={{fontWeight: 'bold'}}>{item.language}</span>
                        </Link>
                    </LinkCont>
                    <Description type={'board'}>
                        {
                            item.description
                        }
                    </Description>
                    <ListItemDescription item={item} include={['issues', 'last_updated', 'stargazers_count']}/>
                </InfoCont>
            </Body>
        </BoardItemTopContainer>
}
