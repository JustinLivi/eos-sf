import './TopNav.css';

import * as React from 'react';
import { Col, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import fett from '../media/fett.png';
import logoPng from '../media/logo.png';

export interface NavProps {}

export const TopNav: React.SFC<NavProps> = props => (
  <Navbar fluid={true}>
    <Col className='align-header'>
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer to='/active/'>
            <img src={logoPng} className='top-nav-logo' />
          </LinkContainer>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav className='create-campaign'>
        <LinkContainer to='/create/'>
          <NavItem>
            <span>New Bounty</span>
          </NavItem>
        </LinkContainer>
      </Nav>
      <Nav>
        <LinkContainer to='/task/'>
          <NavItem>Complete Task</NavItem>
        </LinkContainer>
      </Nav>
    </Col>
    <Nav pullRight={true} className='user-info'>
      <NavItem>
        <img src={fett} className='user-portrait' />
        <span className='username'>Boba</span>
      </NavItem>
    </Nav>
  </Navbar>
);
