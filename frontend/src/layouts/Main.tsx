import './Main.css';

import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

import { Sidebar, SidebarProps } from '../components/Sidebar';

export interface MainLayoutProps extends SidebarProps {}

export const MainLayout: React.SFC<MainLayoutProps> = ({
  activePage,
  children,
}) => (
  <Grid fluid={true} className="page-main-body">
    <Row>
      <Col sm={3} lg={2} className="nav-placeholder" />
      <Col sm={3} lg={2} className="nav-holder">
        <Sidebar activePage={activePage} />
      </Col>

      <Col sm={9} lg={10} className="main-content-holder">
        {children}
      </Col>
    </Row>
  </Grid>
);
