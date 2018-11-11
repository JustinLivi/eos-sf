import * as React from 'react';
import { Col, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

export interface FormProps<FormFields> {
  onChange: (fieldId: keyof FormFields, value: any) => void;
  onSubmit: () => void;
  disabled?: boolean;
  validationState: { [K in keyof FormFields]: string[] | null };
  values: { [K in keyof FormFields]: string | number | string[] | undefined };
}

export interface InputValidationProps<FormFields, InnerInputProps>
  extends FormProps<FormFields> {
  fieldId: keyof FormFields;
  fieldLabel: string;
  inputProps?: InnerInputProps;
}

export interface InputProps {
  onChange?: ((event: React.FormEvent<FormControl>) => void) | undefined;
  disabled?: boolean;
  value?: string | number | string[] | undefined;
}

export function withValidation<InnerInputProps>(
  Input:
    | React.ComponentClass<InputProps & InnerInputProps>
    | React.SFC<InputProps & InnerInputProps>,
) {
  return class InputWithValidation<FormFields> extends React.Component<
    InputValidationProps<FormFields, InnerInputProps>
  > {
    render() {
      const {
        fieldLabel,
        fieldId,
        validationState,
        onChange,
        disabled,
        values,
        inputProps,
      } = this.props;
      let valid: 'success' | 'warning' | 'error' | null | undefined = null;
      if (validationState[fieldId]) {
        valid = 'error';
      } else if (values[fieldId]) {
        valid = 'success';
      }
      return (
        <FormGroup validationState={valid}>
          <Col componentClass={ControlLabel} sm={3}>
            {fieldLabel}
          </Col>
          <Col sm={9}>
            <Input
              onChange={e => {
                onChange(fieldId, (e.target as HTMLInputElement).value);
              }}
              disabled={disabled}
              value={values[fieldId]}
              {...inputProps}
            />
            {validationState[fieldId] && (
              <HelpBlock>
                {(validationState[fieldId] as string[]).join(' ')}
              </HelpBlock>
            )}
          </Col>
        </FormGroup>
      );
    }
  };
}
