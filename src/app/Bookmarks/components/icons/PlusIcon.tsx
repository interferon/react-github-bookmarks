import React from "react";
import styled from "styled-components";

const create_assets_icon = (asset: string) => (
    props: {
        on_click?: (id: string) => void,
        id: string
    }
) => {
    return <Icon
        dangerouslySetInnerHTML={{ __html: require(`../../../../assets/${asset}.svg`) }}
        onClick={() => props.on_click && props.on_click(props.id)}
    />
};

export const PlusIcon = create_assets_icon('plus');
export const RemoveIcon = create_assets_icon('close');
export const AddedIcon = create_assets_icon('checkmark');



const Icon = styled.div`
    width: 20px;
    heightL 20px;
`;