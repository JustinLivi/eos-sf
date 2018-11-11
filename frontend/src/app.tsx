import './styles/App.css';

import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import { TopNav } from './components/TopNav';
import { Active } from './pages/Active';
import { Completed } from './pages/Completed';
import { CreateCampaign } from './pages/CreateCampaign';
import { DataType } from './store/stateDefinition';

export const defaultData: DataType = {
  active_campaigns: []
};

export const App: React.SFC<{}> = () => (
  <Router>
    <React.Fragment>
      <div className="nav-shadow" />
      <TopNav />
      <React.Fragment>
        <Route path="/active/" component={() => <Active />} />
        <Route path="/completed/" component={() => <Completed />} />
        <Route path="/create/" component={() => <CreateCampaign />} />
        <Route exact path="/" render={() => <Redirect to="/active/" />} />
        <Route
          path="/create/"
          component={() => (
            <div className="slide-holder">
              <div className="slide-inner">
                <div className="slide-title">
                  <h1 className="client">Client Interface</h1>
                </div>
                <div className="slide-accent" />
              </div>
            </div>
          )}
        />
        <Route
          path="/task/"
          component={() => (
            <div className="slide-holder">
              <div className="slide-inner">
                <div className="slide-title">
                  <h1 className="contractor">Contractor Interface</h1>
                </div>
                <div className="slide-accent" />
              </div>
            </div>
          )}
        />
      </React.Fragment>
    </React.Fragment>
  </Router>
);
