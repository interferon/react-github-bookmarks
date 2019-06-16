import React from 'react';
import { BIcon } from '../app_icons/icons';
import styled from 'styled-components';

type BoardPlaceholderProps = {
    placeholder: string,
    new_board_name: string,
    on_board_add: () => void,
    on_new_board_name_change: (name: string) => void
};

const Container = styled.div`
    width: 350px;
    display: flex;
    align-items: center;
    height: 65px;
    border: 1px gray dashed;
    margin: 20px;
`

const Input = styled.input`
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
        <BIcon
            on_click={() => props.on_board_add()}
            size='normal'
            type="plus"
        />
    </Container>;
