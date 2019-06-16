import styled from 'styled-components';


export const ItemCont = styled.div`
    flex-direction: column;
    padding: 40px;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    display: flex;
`;
export const LinkCont = styled.div`
    padding: 0px 10px 10px 10px;
    display-flex;
`;
export const Link = styled.a`
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
                        "min-height": 0
                    }
                case 'board':
                    return {
                        "min-height": '75px'
                    }
            }
        }
    }
    padding: 10px;
    font-size: 12px;
`;
export const DescriptionSmall = styled.span`
    display: flex;
    margin-right: 8px;
    font-size: 8px;
`;
export const FlexCont = styled.div`
    padding: 12px;
    display: flex;
`;
