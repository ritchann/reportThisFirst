import React from 'react';
import { Sidepanel } from 'app/applications/sidepanel/sidepanel';
import { Route, Switch } from 'react-router-dom';
import { Line } from 'shared/base/line';
import { Applications } from 'app/applications/applications';
import { MapPage } from 'app/map/mapPage';
import { EditPage } from 'app/applications/editPage';

import './app.scss';

export const App: React.FC = () => {
  return (
    <Line className="app">
      <div className="sidepanel">
        <Sidepanel />
      </div>
      <div className="main-container">
        <Switch>
          <Route path="/applications" component={Applications} />
          <Route path="/edit/:id" render={props => <EditPage {...props}></EditPage>}></Route>
          <Route path="/map" component={MapPage} />
          <Route path="/" component={Applications} />
        </Switch>
      </div>
    </Line>
  );
};