/**
 * 资产运维
 */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
class Operation extends Component {
  render() {
    const { routes } = this.props;
    return (
      <Switch>
        {
          routes.map((route, index) => (
            <Route key={index} path={route.path} component={() => (<route.component routes={route.children}/>)}/>
          ))
        }
      </Switch>
    )
  }
}
export default Operation;