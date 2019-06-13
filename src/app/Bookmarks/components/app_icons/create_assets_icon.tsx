import React from "react";
import styled from "styled-components";


export const create_assets_icon = (asset: string) => (props: {
    on_click?: (id: string) => void;
    id: string;
}) => {
    return <Icon dangerouslySetInnerHTML={{ __html: require(`../../../../assets/${asset}.svg`) }} onClick={() => props.on_click && props.on_click(props.id)} />;
};

const Icon = styled.div`
    width: 20px;
    height: 20px;
`;
