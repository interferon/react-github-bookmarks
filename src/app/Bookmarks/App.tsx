import React from 'react'
import SearchBar from './components/search_bar/SearchBar';
import DropDown from './components/dropdown/DropDown';
import Boards from './components/board/Boards';

type AppProps = {
    
}

export default class App extends React.Component<AppProps> {
    render() {
        return (
            <div>
                <SearchBar/>
                <DropDown/>
                <Boards/>
            </div>
        );
    }
}