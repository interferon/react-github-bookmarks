import React from 'react'
import styled from 'styled-components';
import { SearchIcon } from '../app_icons/icons';

type SearchBarProps = {
    on_search: (text: string) => void,
    status: 'loading' | 'none' 
};

const Bar = styled.div`
    padding-top: 20px;
    padding-bottom: 10px;
    background-color: white;
    display: flex;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
    top: 0;
    left: 0;
    position: fixed;
    right: 0;
    z-index: 30;
    margin-bottom: 1.5rem;
`

const SearchInput = styled.input`
    margin-top: 10px;
    margin-bottom: 10px;
    height: 30px;
    padding: 8px;
    border-radius: 3px;
    border: none;
    outline: none;
    font-size: 20px;
    font-style: italic;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    width: 50%;
    margin: 0 auto;
`

const Logo = styled.div`
    font-size: 20px;
    heigth: 100%;
    display: flex;
    align-items: center;
    margin-right: 20px;
    font-weight: 400;
`;

const Loader = styled.div`
    width: 20px;
`



export default class SearchBar extends React.Component<SearchBarProps> {
    render() {
        return (
            <Bar>
                <SearchContainer>
                    <SearchIcon id=''/>
                    <SearchInput
                        placeholder="Search..."
                        onChange={
                            (e) => {
                                const text = e.target.value;
                                this.props.on_search(text);
                            }
                        }
                    />
                    <Loader>
                        {
                            this.props.status === 'loading' ? 'Loading...' : ''
                        }
                    </Loader>
                </SearchContainer>
                <Logo><span>{"Github Bookmarks"}</span></Logo>
            </Bar>
        );
    }
}