import React from 'react'

type SearchBarProps = {
    on_search: (text: string) => void,
    status: 'loading' | 'none' 
};

export default class SearchBar extends React.Component<SearchBarProps> {
    render() {
        return (
            <div>
                <input placeholder="Search" onChange={
                    (e) => {
                        const text = e.target.value;
                        this.props.on_search(text);
                    }
                }/>
                {
                    this.props.status === 'loading' ? 'Loading...' : ''
                }
            </div>
        );
    }
}