import * as React from 'react';
import { Button, Col, Form, FormGroup } from 'react-bootstrap';

import { FormControlWithValidation } from './inputs/FormControlWithValidation';
import { FormProps } from './withValidation';

import buttonArrow from '../media/cta.png';

export interface CreateFormFields {
  AdName: any;
  ConversionName: any;
  ConversionType: any;
}

export type CreateFormProps = FormProps<CreateFormFields>;

export const CreateForm: React.SFC<CreateFormProps> = props => (
  <React.Fragment>
    <div className="eos-header-holder">
      <div className="bracket top-bracket" />
      <h1 className="header">Create Bounty</h1>
      <div className="bracket bottom-bracket" />
    </div>
    <Form horizontal={true}>
      <FormControlWithValidation
        {...props}
        fieldId="AdName"
        fieldLabel={'Task Name'}
        inputProps={{
          type: 'text'
        }}
      />
      <FormControlWithValidation
        {...props}
        fieldId="ConversionName"
        fieldLabel={'Conversion Name'}
        inputProps={{
          type: 'text'
        }}
      />
      <FormControlWithValidation
        {...props}
        fieldId="ConversionType"
        fieldLabel={'Conversion Type'}
        inputProps={{
          type: 'text'
        }}
      />
      <FormGroup>
        <Col sm={12} className="button-holder">
          <Button onClick={props.onSubmit} disabled={props.disabled}>
            <span>Create </span>
            <img src={buttonArrow} className="cta-arrow" />
          </Button>
        </Col>
      </FormGroup>
    </Form>
  </React.Fragment>
);
