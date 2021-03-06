import React from 'react';
import { Sidepanel } from 'app/sidepanel/sidepanel';
import { Route, Switch } from 'react-router-dom';
import { Line } from 'shared/base/line';
import { Applications } from 'app/applications/applications';
import { MapPage } from 'app/map/mapPage';
import { EditPage } from 'app/applications/edit/editPage';
import { Files } from 'app/files/files';
import { Workers } from 'app/workers/workers';

import './app.scss';

export const App: React.FC = () => {
  return (
    <Line className="app">
      <div className="sidepanel">
        <Sidepanel />
      </div>
      <div className="main-container">
        <Switch>
          <Route path="/edit/:id" render={props => <EditPage {...props}></EditPage>} />
          <Route path="/map" component={MapPage} />
          <Route path="/files" component={Files} />
          <Route path="/workers" component={Workers} />
          <Route path="/" component={Applications} />
        </Switch>
      </div>
    </Line>
  );
};