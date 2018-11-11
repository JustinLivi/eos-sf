import * as React from 'react';
import { Col, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

export interface CreateFormFields {
    AdName: any,
    ConversionName: any,
    ConversionType: any,
}

export interface CreateFormFieldValidation {
    AdName: string[] | null,
    ConversionName: string[] | null,
    ConversionType: string[] | null,
}

export interface CreateFormProps {
    onChange: (fieldId: keyof CreateFormFields, value: any) => void;
    onSubmit: () => void;
    disabled: boolean;
    validationState: CreateFormFields;
    values: CreateFormFields;
}

export interface InputProps extends CreateFormProps {
    fieldId: keyof CreateFormFields; 
    fieldLabel: string;
}

export const Input: React.SFC<InputProps> = ({
    fieldLabel,
    fieldId,
    validationState,
    onChange,
    disabled,
    values
}) => (
    <FormGroup validationState={validationState[fieldId] ? 'error' : 'success'} >
        <Col
            componentClass={ControlLabel}
            sm={3}
        >
            {fieldLabel}
        </Col>
        <Col sm={9}>
            <FormControl
                type="text"
                onChange={(e) => {
                    onChange(fieldId, (e.target as HTMLInputElement).value)
                }}
                disabled={disabled}
                value={values[fieldId]}
            />
            {validationState[fieldId] && <HelpBlock>{validationState[fieldId].join(' ')}</HelpBlock>}
        </Col>
    </FormGroup>
);
