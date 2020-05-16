import React, { useEffect } from 'react';
import { Sidepanel } from 'app/sidepanel/sidepanel';
import { Route, Switch } from 'react-router-dom';
import { Line } from 'shared/base/line';
import { Applications } from 'app/applications/applications';
import { MapPage } from 'app/map/mapPage';
import { EditPage } from 'app/applications/edit/editPage';
import { Files } from 'app/files/files';
import { Employees } from 'app/employee/employees';
import { useDispatch } from 'react-redux';
import { setEmployees } from 'data/employee/action';
import { workers } from 'app/common/workersBase';
import { files } from 'app/common/filesBase';
import { setFiles } from 'data/files/action';

import './app.scss';

export const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setEmployees(workers));
    dispatch(setFiles(files));
  }, [dispatch]);

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
          <Route path="/workers" component={Employees} />
          <Route path="/" component={Applications} />
        </Switch>
      </div>
    </Line>
  );
};