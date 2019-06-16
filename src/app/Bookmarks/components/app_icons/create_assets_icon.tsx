import React from "react";
import styled from "styled-components";
import { merge } from "ramda";

export type IconSize = 'large' | 'normal' | 'small';
export type IconType = "plus" | "star" | "close" | "search" | "check"

export type BoardIconProps = {
    size: IconSize,
    type : IconType,
    on_click: () => void,
    styles: Partial<CSSStyleDeclaration>,
    color : string
}

export const create_assets_icon = ({color, on_click, size, styles, type}: BoardIconProps): JSX.Element => {
    return <Icon
        color={color}
        styles={styles}
        className={"icon"}
        size={size}
        dangerouslySetInnerHTML={{ __html: require(`../../../../assets/${type}.svg`) }}
        onClick={() => on_click()}
    />;
};


const Icon = styled.div<{size: IconSize, styles: Partial<CSSStyleDeclaration>, color: string}>`
    svg {
        path {
            fill: ${(props) => props.color};
        }​
    };
    ${
        (props) => {
            switch (props.size) {
                case 'small':
                    return merge(
                        {
                            width: '10px',
                            height: '10px',
                            margin: "0px 2px 0px 0px"
                        },
                        props.styles
                    )
                case 'normal':
                    return merge(
                        {
                            width: '20px',
                            height: '20px',
                            margin: "2px"  
                        },
                        props.styles
                    )
                case 'large':
                    return merge(
                        {
                            width: '35px', 
                            height: '35px',
                            margin: "2px"
                        },
                        props.styles
                    )
            }
        } 
    }
`;
