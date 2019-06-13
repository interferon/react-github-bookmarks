import React, { useRef } from 'react';
import { GithubRepo } from 'src/app/git_hub_api/search_repos';
import styled from 'styled-components';
import { pick } from 'ramda';
import { BoardPlaceholder } from './BoardPlaceholder';
import { BoardComponent } from './BoardComponent';
import { Board, BoardItem } from 'src/app/typings/bookmarks_typings';

const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    allign-items: center;
`;


type BoardsProps = {
    boards: Board[],
    new_board_name: string
    handlers: {
        on_new_board_created: (b: {title: string}) => void,
        on_new_board_title_change: (board_title: string) => void,
        on_board_remove: (id: Board['id']) => void,
        on_board_item_remove: (a : {board_id: Board['id'], item_id: BoardItem['id']}) => void
        on_item_changed_board: (a : {from_board_id: Board['id'], to_board_id: Board['id'], item_id: BoardItem['id']}) => void,
        on_board_items_sort: (board: Board) => void
    }
};

export const Boards = (props: BoardsProps) => 
    <div>
        <h3>Boards</h3>
        <FlexContainer>
            {
                props.boards.map(
                    board =>
                        <BoardComponent
                            key={board.id}
                            board={board}
                            handlers={
                                pick(
                                    ['on_board_remove', 'on_board_item_remove', 'on_item_changed_board', 'on_board_items_sort'],
                                    props.handlers
                                )
                            }
                        />
                )
            }
            <BoardPlaceholder
                new_board_name={props.new_board_name}
                placeholder={'Enter Name'}
                on_board_add={() => props.handlers.on_new_board_created({title: props.new_board_name})}
                on_new_board_name_change={props.handlers.on_new_board_title_change}
            />
        </FlexContainer>
    </div>;
