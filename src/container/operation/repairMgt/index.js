/**
 * 维修管理
 */ 
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import RouteWithSubRoutes from '../../../route/routeWithSubRoutes';
import NotFound from '../../common/404';

class archivesMgt extends Component {
  render() {
    const { routes } = this.props;
    return (
      <Switch>
        {
          routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route}/>
          ))
        }
        <Route component={NotFound}/>
      </Switch>
    )
  }
}
export default archivesMgt;