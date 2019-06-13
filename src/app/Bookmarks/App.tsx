import * as R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as all_actions from '../actions';
import { debounce } from '../helpers/debounce';
import { BookmarkState } from '../reducer';
import { Boards } from './components/board/Boards';
import { ItemsList } from './components/items_list/ItemsList';
import { Message } from './components/Message';
import SearchBar from './components/search_bar/SearchBar';


type OwnProps = typeof all_actions;

type AppProps = BookmarkState & OwnProps;


class App extends React.Component<AppProps> {
    constructor(props: AppProps){
        super(props);
        this.componentDidMount = () => {
            this.props.load_boards();
        }
    }
    render() {
        const {search, boards_settings, clear_search_result} = this.props;
        const search_repos = debounce(this.props.search_repos, 500, false);
        return (
            <div>
                <SearchBar
                    on_search={
                        (query: string) =>
                            query.length > 2
                                ? search_repos(query)
                                : clear_search_result(query)
                    }
                />
                {
                    this.props.operation.state === 'in_progress' && this.props.operation.type === 'search'
                        ? "Loading..."
                        : <ItemsList
                            items={search.search_result}
                            is_item_added={(item) => R.includes(item.id, search.added_items_ids)}
                            on_add_to_board={
                                (item) => this.props.add_item_to_board(item, this.props.boards_settings.boards[0])
                            }
                        />
                }
                <Boards
                    boards={boards_settings.boards}
                    new_board_name={boards_settings.new_board_name}
                    handlers={{
                        on_new_board_title_change: this.props.change_new_board_title,
                        on_new_board_created: this.props.add_new_board,
                        on_board_item_remove: this.props.remove_board_item,
                        on_board_remove: this.props.remove_board,
                        on_item_changed_board:
                            (params) =>
                                this.props.change_item_board(
                                    params,
                                    this.props.boards_settings.boards
                                )
                        ,
                        on_board_items_sort: (board) => this.props.sort_board_items(board, this.props.boards_settings.boards)
                    }}
                />
                <Message operation={this.props.operation}/>
            </div>
        );
    };
};


const mapStateToProps = (state: BookmarkState) => state;

const mapDispatchToProps = (dispatch: all_actions.BookmarksDispatch) => bindActionCreators(all_actions, dispatch);
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);