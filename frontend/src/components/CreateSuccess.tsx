import * as React from 'react';
import { Button, Col, Form, FormGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { TextWithValidation } from './inputs/TextWithValidation';
import { FormProps } from './withValidation';

export interface CreateSuccessFields {
  AdName: any;
  ConversionName: any;
  ConversionType: any;
}

export type CreateSuccessProps = FormProps<CreateSuccessFields>;

export const CreateSuccess: React.SFC<CreateSuccessProps> = props => (
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
      <Col sm={9} smOffset={3}>
        <LinkContainer to="/active/">
          <Button>Continue</Button>
        </LinkContainer>
      </Col>
    </FormGroup>
  </Form>
);
