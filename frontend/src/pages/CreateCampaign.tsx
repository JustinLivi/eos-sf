import * as React from 'react';
import validate from 'validate.js';

import { CreateForm, CreateFormFields } from '../components/CreateForm';
import { Pages } from '../components/Sidebar';
import { MainLayout } from '../layouts/Main';

export enum CreateCampaignStates {
    Unsubmitted,
    Submitting,
    Submitted,
    Failed,
}

export interface CreateCampaignProps {
    
}

export interface CreateCampaignState {
    state: CreateCampaignStates;
    formValues: CreateFormFields;
    validationState: CreateFormFields;
}

export class CreateCampaign extends React.Component<CreateCampaignProps, CreateCampaignState> {

    constructor(props: CreateCampaignProps) {
        super(props);
        this.state = {
            state: CreateCampaignStates.Unsubmitted,
            formValues: {
                AdName: undefined,
                ConversionName: undefined,
                ConversionType: undefined,
            },
            validationState: {
                AdName: null,
                ConversionName: null,
                ConversionType: null,
            },
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    validateFields(fields: Partial<CreateFormFields>) {
        console.log('called');
        return validate(fields, {
            AdName: { presence: true },
            ConversionName: { presence: true },
            ConversionType: { presence: true },
        });
    }

    handleSubmit() {
        const validationState = this.validateFields(this.state.formValues);
        console.log(validationState);
        if (validationState) {
            this.setState((prev) => ({
                ...prev,
                validationState,
            }));
        } else {
            this.setState((prev) => ({
                ...prev,
                state: CreateCampaignStates.Submitting,
            }));
        }
    }

    handleFieldChange(fieldId: keyof CreateFormFields, value: any) {
        this.setState((prev) => ({
            ...prev,
            formValues: {
                ...prev.formValues,
                [fieldId]: value,
            },
            validationState: {
                AdName: null,
                ConversionName: null,
                ConversionType: null,
            }
        }));
    }

    render() {
        const { state, validationState } = this.state;
        return (
            <MainLayout activePage={Pages.creating}>
                <h1>Create Campaign</h1>
                <CreateForm
                    onSubmit={this.handleSubmit}
                    onChange={this.handleFieldChange}
                    disabled={state !== CreateCampaignStates.Unsubmitted}
                    validationState={validationState}
                />
                {
                    state === CreateCampaignStates.Submitting && <div>submitting...</div>
                }
            </MainLayout>
        );
    }
}