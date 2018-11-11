import * as React from 'react';
import { Col, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

export interface FormProps<FormFields> {
    onChange: (fieldId: keyof FormFields, value: any) => void;
    onSubmit: () => void;
    disabled: boolean;
    validationState: {
        [K in keyof FormFields]: string[] | null;
    };
    values: {
        [K in keyof FormFields]: string | number | string[] | undefined;
    }
}

export interface InputProps<FormFields> extends FormProps<FormFields> {
    fieldId: keyof FormFields; 
    fieldLabel: string;
}

export class Input<FormFields> extends React.Component<InputProps<FormFields>> {
    render() {
        const {
            fieldLabel,
            fieldId,
            validationState,
            onChange,
            disabled,
            values
        } = this.props;
        let valid: "success" | "warning" | "error" | null | undefined = null;
        if (validationState[fieldId]) {
            valid = 'error';
        } else if (values[fieldId]) {
            valid = 'success';
        }
        return (
            <FormGroup validationState={valid} >
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
                    {validationState[fieldId] && <HelpBlock>{(validationState[fieldId] as string[]).join(' ')}</HelpBlock>}
                </Col>
            </FormGroup>
        );
    }
}
