import React, { useState, useEffect } from 'react';
import { BookmarkState } from "src/app/reducer";
import styled from 'styled-components';


const MessageCont = styled.div`
    top: 0px;
    left: 50%;
    transform: translate(-50%, 0%);
    position: fixed;
    z-index: 1000;
`

const SubCont1 = styled.div`
    transition: opacity 250ms ease 0s;
    opacity: 1;
`

const Body = styled.div`
    background-color: rgb(21, 21, 21);
    color: white;
    padding: 10px;
    text-transform: uppercase;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.03) 0px 2px 2px 2px;
    font-family: Arial; width: 300px;
    box-sizing: border-box;
    margin: 10px;
`

const Button = styled.button`
    margin-left: 20px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: rgb(255, 255, 255);
`

const msg_type_to_color: Record<BookmarkState['operation']['state'], string> = {
    error: "#EA2027",
    in_progress: "#ecf0f1",
    success: "#2ecc71"
}

export const Message = (props: { operation: BookmarkState['operation'] }): JSX.Element | null => {
    const [operation, setMsg] = useState<BookmarkState['operation'] | null>(props.operation);

    useEffect(() => setMsg(props.operation), [props]);

    setTimeout(
        () => setMsg(null),
        3000
    );
    return operation && operation.state === 'error'
        ? <MessageCont>
            <div>
                <SubCont1>
                    <Body>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke={msg_type_to_color[operation.state]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            style={{
                                marginRight: "20px",
                                marginLeft: "10px",
                                minWidth: "24px"
                            }}>
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12" y2="8"></line>
                        </svg>
                        <span style={{flex: "2 1 0%"}}>{operation.message}</span>
                        <Button onClick={() => setMsg(null)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                style={{
                                    marginRight: "0px",
                                    minWidth: "24px"
                                }}>
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18">
                                </line>
                            </svg>
                        </Button>
                    </Body>
                </SubCont1>
            </div>
        </MessageCont>
        : null
};


