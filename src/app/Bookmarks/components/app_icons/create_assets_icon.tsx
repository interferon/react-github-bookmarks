import React from "react";
import styled from "styled-components";

export type IconSize = 'large' | 'normal' | 'small';
export type IconType = "plus" | "star" | "close" | "search"

export const create_assets_icon = (type : IconType, size: IconSize, on_click?: () => void): JSX.Element => {
    return <Icon
        size={size}
        dangerouslySetInnerHTML={{ __html: require(`../../../../assets/${type}.svg`) }}
        onClick={() => on_click && on_click()}
    />;
};


const Icon = styled.div<{size: IconSize}>`
    ${
        (props) => {
            switch (props.size) {
                case 'small':
                    return {
                        width: '10px',
                        height: '10px',
                        margin: "0px 2px 0px 0px"
                    }
                case 'normal':
                    return {
                        width: '20px',
                        height: '20px',
                        margin: "2px"  
                    }
                case 'large':
                    return {
                        width: '30px', 
                        height: '30px',
                        margin: "2px"
                    }
            }
        } 
    }
`;
