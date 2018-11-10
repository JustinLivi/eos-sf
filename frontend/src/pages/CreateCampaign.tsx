import * as React from 'react';
import { Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

import { Pages } from '../components/Sidebar';
import { MainLayout } from '../layouts/Main';

export const CreateCampaign = () => (
    <MainLayout activePage={Pages.creating}>
        <h1>Create Campaign</h1>
        <Form horizontal={true}>
            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                    Ad Name
                </Col>
                <Col sm={10}>
                    <FormControl type="text"/>
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                    Conversion Name
                </Col>
                <Col sm={10}>
                    <FormControl type="text"/>
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                    Conversion Type
                </Col>
                <Col sm={10}>
                    <FormControl type="text"/>
                </Col>
            </FormGroup>
        </Form>
    </MainLayout>
);