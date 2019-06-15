import React from "react";
import styled from "styled-components";

export type Size = 'large' | 'normal' | 'small';
export type IconType = "plus" | "star" | "close" | "search"

export const create_assets_icon = (type : IconType, size: Size, on_click?: () => void): JSX.Element => {
    return <Icon
        size={size}
        dangerouslySetInnerHTML={{ __html: require(`../../../../assets/${type}.svg`) }}
        onClick={() => on_click && on_click()}
    />;
};


const Icon = styled.div<{size: Size}>`
    width: 10px;
    height: 10px;
    ${
        (props) => {
            switch (props.size) {
                case 'small':
                    return {
                        width: '10px', 
                    }
                case 'normal':
                    return {
                        width: '20px', 
                    }
                case 'large':
                    return {
                        width: '30px', 
                    }
            }
        } 
    }
`;
