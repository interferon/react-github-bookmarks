import styled from 'styled-components';

export const Bar = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: white;
    display: flex;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
    top: 0;
    left: 0;
    position: fixed;
    right: 0;
    z-index: 30;
    margin-bottom: 1.5rem;
    width: 98%;
    margin: 0 auto;
`;

export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    margin-right: auto;
    margin-left: 50px;
`;

export const Logo = styled.div`
    color: #4b4b4b;
    font-size: 20px;
    heigth: 100%;
    display: flex;
    align-items: center;
    margin-right: 20px;
    font-weight: 400;
`;
