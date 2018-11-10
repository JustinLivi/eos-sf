import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

import { Sidebar, SidebarProps } from '../components/Sidebar';

export interface MainLayoutProps extends SidebarProps {
}

export const MainLayout: React.SFC<MainLayoutProps> = ({ activePage, children }) => (
    <Grid fluid={true} >
        <Row>
            <Col sm={3} >
                <Sidebar activePage={activePage} />
            </Col>
            <Col sm={8} >
                {children}
            </Col>
        </Row>
    </Grid>
);