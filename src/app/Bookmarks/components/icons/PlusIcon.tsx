import React from "react";
import styled from "styled-components";

export const PlusIcon = (props: {on_click: (id: string) => void, id: string}) => {
    return <Icon
        dangerouslySetInnerHTML={{ __html: require('../../../../assets/plus.svg') }}
        onClick={() => props.on_click(props.id)}
    />

};

const Icon = styled.div`
    width: 10px;
    heightL 10px;
`;