import * as React from 'react';
import { Button, Col, Form, FormGroup } from 'react-bootstrap';

import { CreateFormProps, Input } from './Input';

export const CreateForm: React.SFC<CreateFormProps> = (props) => (
    <Form horizontal={true}>
        <Input {...props} fieldId="AdName" />
        <Input {...props} fieldId="ConversionName" />
        <Input {...props} fieldId="ConversionType" />
        <FormGroup>
            <Col
                sm={9}
                smOffset={3}
            >
                <Button
                    onClick={props.onSubmit}
                    disabled={props.disabled}
                >
                    Create
                </Button>
            </Col>
        </FormGroup>
    </Form>
);