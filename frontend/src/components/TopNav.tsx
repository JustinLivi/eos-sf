import './TopNav.css';

import * as React from 'react';
import { Col, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import logoPng from '../media/logo.png';

export interface NavProps {}

export const TopNav: React.SFC<NavProps> = props => (
  <Navbar fluid={true}>
    <Col sm={3} className="align-header">
      <Navbar.Header>
        <LinkContainer to="/active/">
          <Navbar.Brand>
            <img src={logoPng} className="top-nav-logo" />
          </Navbar.Brand>
        </LinkContainer>
      </Navbar.Header>
      <Nav pullRight={true} className="create-campaign">
        <LinkContainer to="/create/">
          <NavItem>New Bounty</NavItem>
        </LinkContainer>
      </Nav>
    </Col>
    <Nav pullRight={true}>
      <NavItem>User 1</NavItem>
    </Nav>
  </Navbar>
);
