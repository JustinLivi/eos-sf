import * as React from 'react';
import { Button, Col, Form, FormGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { TextWithValidation } from './inputs/TextWithValidation';
import { FormProps } from './withValidation';

import buttonArrow from '../media/cta.png';

export interface CreateSuccessFields {
  AdName: any;
  ConversionName: any;
  ConversionType: any;
}

export type CreateSuccessProps = FormProps<CreateSuccessFields>;

export const CreateSuccess: React.SFC<CreateSuccessProps> = props => (
  <React.Fragment>
  <div className="eos-header-holder">
      <div className="bracket top-bracket" />
      <h1 className="header">Campaign Created</h1>
      <div className="bracket bottom-bracket" />
    </div>
  <Form horizontal={true}>
  
    <TextWithValidation
      {...props}
      fieldId="AdName"
      fieldLabel={'Ad Name'}
      inputProps={{
        type: 'text',
      }}
    />
    <TextWithValidation
      {...props}
      fieldId="ConversionName"
      fieldLabel={'Conversion Name'}
      inputProps={{
        type: 'text',
      }}
    />
    <TextWithValidation
      {...props}
      fieldId="ConversionType"
      fieldLabel={'Conversion Type'}
      inputProps={{
        type: 'text',
      }}
    />
    <FormGroup>
      <Col sm={12} className="button-holder">
        <LinkContainer to="/active/">
          <Button>
          <span>My Campaigns  </span><img src={buttonArrow} className="cta-arrow" />
          </Button>
        </LinkContainer>
      </Col>
    </FormGroup>
  </Form>
  </React.Fragment>
);
