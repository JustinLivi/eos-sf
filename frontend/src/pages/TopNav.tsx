import './TopNav.css';

import * as React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import logoPng from '../media/logo.png';

export interface NavProps {}

export const TopNav: React.SFC<NavProps> = props => (
  <Navbar fluid={true} fixedTop={true}>
    <Navbar.Header>
      <LinkContainer to='/active/'>
        <NavItem>
          <img src={logoPng} className='top-nav-logo' />
        </NavItem>
      </LinkContainer>
    </Navbar.Header>
    <Nav>
      <LinkContainer to='/create/'>
        <NavItem>New Bounty</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight={true}>
      <NavItem>User 1</NavItem>
    </Nav>
  </Navbar>
);
