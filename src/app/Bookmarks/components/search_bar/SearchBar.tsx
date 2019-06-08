import React from 'react'

type SearchBarProps = {
    on_search: (text: string) => void 
}

export default class SearchBar extends React.Component<SearchBarProps> {
    render() {
        return (
            <div>
                <input placeholder="Search" onChange={
                    (e) => {
                        const text = e.target.value;
                        text.length >= 2 && this.props.on_search(text);
                    }
                }/>
            </div>
        );
    }
}