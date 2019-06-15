import React from "react";
import styled from "styled-components";


export const create_assets_icon = (asset: string, size: 'large' | 'normal') => (props: {
    on_click?: (id: string) => void;
    id: string;
}) => {
    switch (size) {
        case 'normal':
            return <IconNormal dangerouslySetInnerHTML={{ __html: require(`../../../../assets/${asset}.svg`) }} onClick={() => props.on_click && props.on_click(props.id)} />;
        case 'large':
            return <IconLarge dangerouslySetInnerHTML={{ __html: require(`../../../../assets/${asset}.svg`) }} onClick={() => props.on_click && props.on_click(props.id)} />;
    }
};

const IconLarge = styled.div`
    width: 30px;
    height: 30px;
`;

const IconNormal = styled.div`
    width: 20px;
    height: 20px;
`;
