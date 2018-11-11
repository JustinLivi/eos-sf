import './Sidebar.css';

import * as React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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
    <LinkContainer to="/active/">
      <ListGroupItem active={activePage === Pages.activeCampaigns}>
        Active Bounties
      </ListGroupItem>
    </LinkContainer>
    <LinkContainer to="/completed/">
      <ListGroupItem active={activePage === Pages.completedCampaigns}>
        Completed Bounties
      </ListGroupItem>
    </LinkContainer>
  </ListGroup>
);
