import * as React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export interface NavProps {

}

export const TopNav: React.SFC<NavProps> = (props) => (
    <Navbar fluid={true} >
        <Navbar.Header>
            <LinkContainer to="/browse/">
                <Navbar.Brand>
                    Brand
                </Navbar.Brand>
            </LinkContainer>
        </Navbar.Header>
        <Nav pullRight={true}>
            <NavItem>
                User 1
            </NavItem>
        </Nav>
    </Navbar>
)