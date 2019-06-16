import * as R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import '../../styles.css';
import * as all_actions from '../actions';
import { BookmarkState } from '../reducer';
import { Boards } from './components/board/Boards';
import { Message } from './components/Message';
import { TopBar } from './components/search_bar/TopBar';

type OwnProps = typeof all_actions;

type AppProps = BookmarkState & OwnProps;

const Main = styled.div`
    margin-top: 100px;
`

class App extends React.Component<AppProps> {
    constructor(props: AppProps){
        super(props);
        this.componentDidMount = () => {
            this.props.load_boards();
        }
    }
    render() {
        const {search, boards_settings, operation, search_repos} = this.props;
        return (
            <div>
                <TopBar
                    on_search={
                        (query: string) => {
                            if(query.length > 2) {
                                this.props.set_operation_state({
                                    message: '',
                                    state: 'in_progress',
                                    type: 'search'
                                });
                                search_repos(query)
                            }
                        }
                    }
                    status ={ operation.state === 'in_progress' && operation.type === 'search' ? 'loading': 'none'}
                    items={search.search_result}
                    is_item_added={(item) => R.includes(item.id, search.added_items_ids)}
                    on_add_to_board={
                        (item) => this.props.add_item_to_board(item, this.props.boards_settings.boards[0])
                    }
                />
                <Main>
                    <Boards
                        boards={boards_settings.boards}
                        new_board_name={boards_settings.new_board_name}
                        handlers={{
                            on_new_board_title_change: this.props.change_new_board_title,
                            on_new_board_created: this.props.add_new_board,
                            on_board_item_remove: this.props.remove_board_item,
                            on_board_remove: this.props.remove_board,
                            on_item_changed_board: (params) => this.props.change_item_board(params, this.props.boards_settings.boards),
                            on_board_items_sort: (board) => this.props.sort_board_items(board, this.props.boards_settings.boards)
                        }}
                    />
                </Main>
                <Message operation={operation}/>
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