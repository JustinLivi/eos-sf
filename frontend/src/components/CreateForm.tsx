import * as React from 'react';
import { Button, Col, Form, FormGroup } from 'react-bootstrap';

import { FormProps, Input } from './Input';

export interface CreateFormFields {
    AdName: any,
    ConversionName: any,
    ConversionType: any,
}

export type CreateFormProps = FormProps<CreateFormFields>;

export const CreateForm: React.SFC<CreateFormProps> = (props) => (
    <Form horizontal={true}>
        <Input {...props} fieldId="AdName" fieldLabel={"Ad Name"} />
        <Input {...props} fieldId="ConversionName" fieldLabel={"Conversion Name"} />
        <Input {...props} fieldId="ConversionType" fieldLabel={"Conversion Type"} />
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