import * as React from 'react';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

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
}

export const CreateForm: React.SFC<CreateFormProps> = ({ onSubmit, onChange, disabled, validationState }) => (
    <Form horizontal={true}>
        <FormGroup validationState={validationState.AdName ? 'error' : 'success'} >
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
                        onChange('AdName', (e.target as HTMLInputElement).value)
                    }}
                    disabled={disabled}
                />
                {validationState.AdName && <HelpBlock>{validationState.AdName.join(' ')}</HelpBlock>}
            </Col>
        </FormGroup>
        <FormGroup validationState={validationState.ConversionName ? 'error' : 'success'} >
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
                        onChange('ConversionName', (e.target as HTMLInputElement).value)
                    }}
                    disabled={disabled}
                />
                {validationState.ConversionName && <HelpBlock>{validationState.ConversionName.join(' ')}</HelpBlock>}
            </Col>
        </FormGroup>
        <FormGroup validationState={validationState.ConversionType ? 'error' : 'success'} >
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
                        onChange('ConversionType', (e.target as HTMLInputElement).value)
                    }}
                    disabled={disabled}
                />
                {validationState.ConversionType && <HelpBlock>{validationState.ConversionType.join(' ')}</HelpBlock>}
            </Col>
        </FormGroup>
        <FormGroup>
            <Col
                sm={10}
                smOffset={2}
            >
                <Button
                    onClick={onSubmit}
                    disabled={disabled}
                >
                    Create
                </Button>
            </Col>
        </FormGroup>
    </Form>
);