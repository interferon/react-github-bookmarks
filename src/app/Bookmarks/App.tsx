import React from 'react'
import SearchBar from './components/search_bar/SearchBar';
import {DropDown, Item } from './components/dropdown/DropDown';
import Boards from './components/board/Boards';
import { BookmarkState } from '../reducer';
import { connect } from 'react-redux';
import * as all_actions from '../actions'
import { bindActionCreators } from 'redux';
import { Message } from './components/Message';
import { debounce } from '../helpers/debounce';

type OwnProps = typeof all_actions;

type AppProps = BookmarkState & OwnProps;


class App extends React.Component<AppProps> {

    render() {
        const {items} = this.props;
        const search_repos = debounce(this.props.search_repos, 500, false);
        return (
            <div>
                <SearchBar on_search={search_repos}/>
                {
                    this.props.operation.state === 'in_progress'
                        ? "Loading..."
                        : <DropDown items={items}/>
                }
                <Boards/>
                <Message operation={this.props.operation}/>
            </div>
        );
    }
};


const mapStateToProps = (state: BookmarkState) => state;

const mapDispatchToProps = (dispatch: all_actions.BookmarksDispatch) => bindActionCreators(all_actions, dispatch);
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);