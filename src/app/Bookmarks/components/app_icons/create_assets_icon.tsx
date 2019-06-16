import React from "react";
import styled from "styled-components";
import { merge } from "ramda";

export type IconSize = 'large' | 'normal' | 'small';
export type IconType = "plus" | "star" | "close" | "search" | "check"

export const create_assets_icon = (type : IconType, size: IconSize, styles: Partial<CSSStyleDeclaration>, on_click: () => void): JSX.Element => {
    return <Icon
        styles={styles}
        className={"icon"}
        size={size}
        dangerouslySetInnerHTML={{ __html: require(`../../../../assets/${type}.svg`) }}
        onClick={() => on_click()}
    />;
};


const Icon = styled.div<{size: IconSize, styles: Partial<CSSStyleDeclaration>}>`
    svg {
        path {
            fill: #999;
        }​
    };
    ${
        (props) => {
            console.log(props);
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
