import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

import { Sidebar, SidebarProps } from '../components/Sidebar';

import './Main.css';

import background from '../media/bg.jpg';

export interface MainLayoutProps extends SidebarProps {
}

export const MainLayout: React.SFC<MainLayoutProps> = ({ activePage, children }) => (
    <Grid fluid={true} className="page-main-body" >
        <Row>
            <Col sm={3} lg={2} className="nav-holder" >
                <Sidebar activePage={activePage} />
            </Col>
            <Col sm={9} lg={10} >
                {children}
            </Col>
        </Row>
    </Grid>
);