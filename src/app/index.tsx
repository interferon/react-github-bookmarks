// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router, Switch, Redirect, Route } from 'react-router-dom'

import { store } from './store'
import { routes } from './routes'
import './global'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'


class Application extends React.PureComponent {
  render () {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Provider store={store}>
          <Router>
            <Switch>
              {
                routes.map(
                  (route, i) =>
                    <Route
                      key={i}
                      path={route.path}
                      component={route.component}
                      onEnter={() => {}}
                    />
                )
              }
              <Redirect key={-1} to='/boards' />
            </Switch>
          </Router>
        </Provider>
      </DragDropContextProvider>
    )
  }
};

ReactDOM.render(
  <Application/>,
  document.getElementById('root')
);