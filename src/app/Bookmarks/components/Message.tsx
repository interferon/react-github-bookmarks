import React from 'react';
import { BookmarkState } from "src/app/reducer";
import styled from 'styled-components';


const MessageCont = styled.div`
    z-index: 1000;
    color: #e74c3c;
    position: absolute;
    top: 15px;
    left: 50%;
    width: 300px;
    height: 45px;
    padding: 20px;
    margin-left: -150px;
    text-transform: uppercase;
    font-weight: 600;
    background-color: #2c3e50;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Message = (op: {operation: BookmarkState['operation']}): JSX.Element => {
    return <div></div>
}