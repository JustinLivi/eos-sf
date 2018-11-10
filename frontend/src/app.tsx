import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import { TopNav } from './components/TopNav';
import { Active } from './pages/Active';
import { Browse } from './pages/Browse';
import { Completed } from './pages/Completed';
import { CreateCampaign } from './pages/CreateCampaign';

export const App: React.SFC<{}> = () => (
    <Router>
        <React.Fragment>
            <TopNav />
            <Route path="/browse/" component={Browse} />
            <Route path="/active/" component={Active} />
            <Route path="/completed/" component={Completed} />
            <Route path="/create/" component={CreateCampaign} />
            <Route exact path="/" render={() => (
                <Redirect to="/browse/"/>
            )}/>
        </React.Fragment>
    </Router>
);
