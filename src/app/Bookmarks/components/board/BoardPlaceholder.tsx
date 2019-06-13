import React from 'react';
import { PlusIcon } from '../app_icons/icons';
import styled from 'styled-components';

const Placeholder = styled.div`display: flex;`;
type BoardPlaceholderProps = {
    placeholder: string,
    new_board_name: string,
    on_board_add: () => void,
    on_new_board_name_change: (name: string) => void
};

export const BoardPlaceholder = (props: BoardPlaceholderProps) =>
    <Placeholder>
        <input
            value={props.new_board_name}
            placeholder={props.placeholder}
            onChange={(e) => props.on_new_board_name_change(e.target.value)}
        />
        <PlusIcon
            id={''}
            on_click={() => props.on_board_add()}
        />
    </Placeholder>;
