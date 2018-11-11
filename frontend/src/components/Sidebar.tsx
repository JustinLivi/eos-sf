import * as React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './Sidebar.css';

export enum Pages {
    browse = 'browse',
    activeCampaigns = 'active',
    completedCampaigns = 'completed',
    creating = 'creating'
}

export interface SidebarProps {
    activePage: Pages;
}

export const Sidebar: React.SFC<SidebarProps> = ({ activePage }) => (
    <ListGroup>
        <LinkContainer to="/browse/">
            <ListGroupItem active={activePage === Pages.browse} >Browse</ListGroupItem>
        </LinkContainer>
        <LinkContainer to="/active/">
            <ListGroupItem active={activePage === Pages.activeCampaigns} >Active Campaigns</ListGroupItem>
        </LinkContainer>
        <LinkContainer to="/completed/">
            <ListGroupItem active={activePage === Pages.completedCampaigns} >Completed Campaigns</ListGroupItem>
        </LinkContainer>
    </ListGroup>
);
