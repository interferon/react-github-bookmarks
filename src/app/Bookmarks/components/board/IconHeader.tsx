import styled from 'styled-components';
import React from 'react';
import { BIcon } from '../app_icons/icons';
import { IconType, IconSize } from '../app_icons/create_assets_icon';

const Header = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
`;

export const IconLeftHeader = (props: {on_click: () => void, type: IconType, size: IconSize}) => <Header>
    <BIcon
        on_click={() => props.on_click()}
        size={props.size}
        type={props.type}
    />
    </Header>