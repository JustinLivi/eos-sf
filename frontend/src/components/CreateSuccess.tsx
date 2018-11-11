import * as React from 'react';
import { Button, Col, Form, FormGroup } from 'react-bootstrap';

import { FormControlWithValidation } from './inputs/FormControlWithValidation';
import { FormProps } from './withValidation';


export interface CreateSuccessFields {
    AdName: any,
    ConversionName: any,
    ConversionType: any,
}

export type CreateSuccessProps = FormProps<CreateSuccessFields>;

export const CreateSuccess: React.SFC<CreateSuccessProps> = (props) => (
    <Form horizontal={true}>
        <FormControlWithValidation
            {...props}
            fieldId="AdName"
            fieldLabel={"Ad Name"}
            inputProps={{
                type: 'text'
            }}
        />
        <FormControlWithValidation
            {...props}
            fieldId="ConversionName"
            fieldLabel={"Conversion Name"}
            inputProps={{
                type: 'text'
            }}
        />
        <FormControlWithValidation
            {...props}
            fieldId="ConversionType"
            fieldLabel={"Conversion Type"}
            inputProps={{
                type: 'text'
            }}
        />
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