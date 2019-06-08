import React from 'react'

type SearchBarProps = {
    
}

export default class SearchBar extends React.Component<SearchBarProps> {
    render() {
        return (
            <div>
                <input placeholder="Search"/>
            </div>
        );
    }
}