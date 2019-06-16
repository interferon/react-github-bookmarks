import React from 'react';
import { BoardIcon } from '../app_icons/icons';
import styled from 'styled-components';

type BoardPlaceholderProps = {
    placeholder: string,
    new_board_name: string,
    on_board_add: () => void,
    on_new_board_name_change: (name: string) => void
};

const Container = styled.div`
    width: 400px;
    display: flex;
    align-items: center;
    height: 85px;
    border: 1px gray dashed;
    margin: 20px;
    border-radius: 0px;
`

const Input = styled.input`
    background-color: #f5f7fa;
    font-size : 25px;
    width: 100%;
    border: none;
    outline: none;
    padding-left: 10px;
`

export const BoardPlaceholder = (props: BoardPlaceholderProps) =>
    <Container>
        <Input
            value={props.new_board_name}
            placeholder={props.placeholder}
            onChange={(e) => props.on_new_board_name_change(e.target.value)}
            onKeyDown={
                (e) => props.new_board_name.length > 0 && e.key === 'Enter' && props.on_board_add()
            }
        />
        <BoardIcon
            on_click={() => props.new_board_name.length > 0 && props.on_board_add()}
            size='large'
            type="plus"
        />
    </Container>;
