import './styles/App.css';

import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import { Store } from './components/Store';
import { TopNav } from './components/TopNav';
import { Active } from './pages/Active';
import { Completed } from './pages/Completed';
import { CreateCampaign } from './pages/CreateCampaign';

export interface Campaign {
  unique_id: number;
  target_users: number;
  activated_users: number;
  user_reward: {
    symbol: string;
    amount: number;
  };
}

export interface DataType {
  active_campaigns: Campaign[];
}

export const defaultData: DataType = {
  active_campaigns: [
    {
      unique_id: 100,
      target_users: 100,
      activated_users: 100,
      user_reward: {
        symbol: 'something',
        amount: 1,
      },
    },
  ],
};

export const App: React.SFC<{}> = () => (
  <Router>
    <React.Fragment>
      <div className="nav-shadow" />
      <TopNav />
      <Store
        defaultData={defaultData}
        render={({ data }) => (
          <React.Fragment>
            <Route path="/active/" component={() => <Active data={data} />} />
            <Route
              path="/completed/"
              component={() => <Completed data={data} />}
            />
            <Route path="/create/" component={CreateCampaign} />
            <Route exact path="/" render={() => <Redirect to="/active/" />} />
          </React.Fragment>
        )}
      />
    </React.Fragment>
  </Router>
);
