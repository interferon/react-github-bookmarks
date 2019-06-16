import { merge } from 'ramda';
import React from 'react';
import { Item } from 'src/app/typings/bookmarks_typings';
import styled from 'styled-components';
import { ItemDescriptionFooter } from '../search_bar/ItemDescriptionFooter';
import { ItemLinkCont } from '../search_bar/ItemLinkCont';
import { Description } from '../search_bar/list_item_components';
import { IconLeftHeader } from './IconHeader';
import { truncate } from '../../../helpers/truncate';


const BoardItemTopContainer = styled.div<{
    is_dragging: boolean;
}> `
    ${
        (props) => props.is_dragging
            ? { opacity: 0 }
            : merge({ opacity: 1}, {})
    }

    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    height: 200px;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
    background-color: white;
    margin: 2px 0px 2px 0px;
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
    width: 25%;
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
            className={"board_item"}
            is_dragging={is_dragging}
            key={item.id}
            innerRef={node => add_ref(node)}
        >
            <IconLeftHeader
                on_click={() => on_item_remove(item.id)}
                size='normal'
                type="close"
            />
            <Body>
                <AvatarCont>
                    <Avatar src={item.owner.avatar_url}/>
                </AvatarCont>
                <InfoCont>
                    <ItemLinkCont
                        login={item.owner.login}
                        repo_name={item.name}
                        url={item.url}
                    />
                    <Description type={'board'}>
                        {
                            truncate(item.description || '', 120)
                        }
                    </Description>
                    <ItemDescriptionFooter item={item} include={['stargazers_count', 'issues', 'last_updated']}/>
                </InfoCont>
            </Body>
        </BoardItemTopContainer>
}
