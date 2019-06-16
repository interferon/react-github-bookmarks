import * as R from 'ramda';
import React from 'react';
import { Board, Item } from 'src/app/typings/bookmarks_typings';
import { BoardComponent } from './BoardComponent';
import { BoardPlaceholder } from './BoardPlaceholder';
import styled from 'styled-components';


const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-flow: wrap;
    width: 70%;
    margin: 0 auto;
`

type BoardsProps = {
    boards: Board[],
    new_board_name: string
    handlers: {
        on_new_board_created: (b: {title: string}) => void,
        on_new_board_title_change: (board_title: string) => void,
        on_board_remove: (id: Board['id']) => void,
        on_board_item_remove: (a : {board_id: Board['id'], item_id: Item['id']}) => void
        on_item_changed_board: (a : {from_board_id: Board['id'], to_board_id: Board['id'], item_id: Item['id']}) => void,
        on_board_items_sort: (board: Board) => void
    }
};

export const Boards = ({boards, handlers, new_board_name}: BoardsProps): JSX.Element => 
    <Container className="boards">
        {
            boards.map(
                board =>
                    <BoardComponent
                        key={board.id}
                        board={board}
                        handlers={{
                            on_board_remove: handlers.on_board_remove,
                            on_board_item_remove: handlers.on_board_item_remove,
                            on_item_changed_board: handlers.on_item_changed_board,
                            on_board_items_sort: handlers.on_board_items_sort
                        }}
                        get_board_id_for_item= {
                            (item_id) => boards.filter(_ => R.findIndex(i => i.id === item_id, _.items) > -1)[0].id
                        }
                    />
            )
        }
        <BoardPlaceholder
            new_board_name={new_board_name}
            placeholder={'Enter Name'}
            on_board_add={() => handlers.on_new_board_created({title: new_board_name})}
            on_new_board_name_change={handlers.on_new_board_title_change}
        />
    </Container>