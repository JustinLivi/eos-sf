import * as React from 'react';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

export enum CreateFormFields {
    AdName = 'AdName',
    ConversionName = 'ConversionName',
    ConversionType = 'ConversionType',
}

export interface CreateFormProps {
    onChange: (fieldId: CreateFormFields, value: any) => void;
    onSubmit: () => void;
}

export const CreateForm: React.SFC<CreateFormProps> = ({ onSubmit, onChange }) => (
    <Form horizontal={true}>
        <FormGroup>
            <Col
                componentClass={ControlLabel}
                sm={2}
            >
                Ad Name
            </Col>
            <Col sm={10}>
                <FormControl
                    type="text"
                    onChange={(e) => {
                        onChange(CreateFormFields.AdName, (e.target as HTMLInputElement).value)
                    }}
                />
            </Col>
        </FormGroup>
        <FormGroup>
            <Col
                componentClass={ControlLabel}
                sm={2}
            >
                Conversion Name
            </Col>
            <Col sm={10}>
                <FormControl
                    type="text"
                    onChange={(e) => {
                        onChange(CreateFormFields.ConversionName, (e.target as HTMLInputElement).value)
                    }}
                />
            </Col>
        </FormGroup>
        <FormGroup>
            <Col
                componentClass={ControlLabel}
                sm={2}
            >
                Conversion Type
            </Col>
            <Col sm={10}>
                <FormControl
                    type="text"
                    onChange={(e) => {
                        onChange(CreateFormFields.ConversionType, (e.target as HTMLInputElement).value)
                    }}
                />
            </Col>
        </FormGroup>
        <FormGroup>
            <Col
                sm={10}
                smOffset={2}
            >
                <Button onSubmit={onSubmit} >
                    Create
                </Button>
            </Col>
        </FormGroup>
    </Form>
);