import styled from 'styled-components';


export const ItemCont = styled.div`
    flex-direction: column;
    padding: 40px;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    display: flex;
`;
export const LinkCont = styled.div`
    width: 100%;
    padding: 0px;
    display-flex;
`;
export const Link = styled.a<{disabled: boolean}>`
    color: #136ce4;
    font-size: 12px;
    text-decoration: none;
    ${({disabled}) => disabled ? 'pointer-events: none; cursor: default;' : ''}
`;
export const FlexContSplitted = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
export const Description = styled.div<{type: "board" | "search"}>`
    ${
        ({type}) => {
            switch (type) {
                case 'search':
                    return {
                        fontSize: "12px"
                    }
                case 'board':
                    return {
                        fontSize: "10px"
                    }
            }
        }
    }
    width: 100%;
    padding: 0px;
    text-align: justify;
    flex-grow: 2;
    padding: 5px 0px;
`;
export const DescriptionSmall = styled.span<{type: "board" | "search"}>`
    ${
        ({type}) => {
            switch (type) {
                case 'search':
                    return {
                        fontSize: "10px"
                    }
                case 'board':
                    return {
                        fontSize: "7px"
                    }
            }
        }
    }
    display: flex;
    align-items: center;
    margin-right: 8px;
`;
export const FlexCont = styled.div`
    width: 100%;
    padding: opx;
    display: flex;
`;
