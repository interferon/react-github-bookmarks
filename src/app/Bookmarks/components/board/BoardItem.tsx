import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Item, DragItem } from 'src/app/typings/bookmarks_typings';
import styled from 'styled-components';
import { BIcon } from '../app_icons/icons';
import { LinkCont, Link, Description } from '../search_bar/list_item_components';
import { ListItemDescription } from '../search_bar/ListItemDescription';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    height: 200px;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
`;

const Header = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
`

const Body = styled.div`
    display: flex;
    width: 100%;
    padding: 15px;
`

const InfoCont = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const Avatar = styled.img`
    width: 50px;
    border-radius: 50px;
`

const AvatarCont = styled.div`
    width: 30%;
`

export type BoardItemProps = {
    on_item_remove: (id: string) => void,
    item: Item,
    index: number,
    on_item_sort: (item_id: Item['id'], to: number) => void,
    on_drop: () => void
};

export const BoardItemComponent = ({ on_item_remove, item, index, on_item_sort, on_drop}: BoardItemProps): JSX.Element => {
    // hook for sorting
    const [_, drop] = useDrop<DragItem, any, any>(
        {
            accept: "board_item",
            canDrop: () => true,
            hover: (dragged_item) => {
                if (dragged_item.id !== item.id) {
                    on_item_sort(dragged_item.id, index);
                }
            },
            drop: () => {
                on_drop()
            }
        }
    );

    // hook for dragging
    const [{ isDragging }, drag] = useDrag<DragItem, any, any>(
        {
            item: { id: item.id, type: 'board_item', index },
            collect: (monitor) => ({
                isDragging: monitor.getItem() ? monitor.getItem().id === item.id : false
            })
        }
    );

    return (
        <Container key={item.id}  innerRef={node => drag(drop(node))}>
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
                    <Description>
                        {
                            item.description
                        }
                    </Description>
                    <ListItemDescription item={item} include={['stargazers_count', 'issues', 'last_updated']}/>
                </InfoCont>
            </Body>
        </Container>
    );
};
