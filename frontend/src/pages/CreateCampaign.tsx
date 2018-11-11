import './CreateCampaign.css';

import * as React from 'react';
import { BarLoader } from 'react-spinners';
import { validate } from 'validate.js';

import { CreateForm, CreateFormFields } from '../components/CreateForm';
import { CreateSuccess } from '../components/CreateSuccess';
import { Pages } from '../components/Sidebar';
import { MainLayout } from '../layouts/Main';

export enum CreateCampaignStates {
  Unsubmitted,
  Submitting,
  Submitted,
  Failed,
}

export interface CreateCampaignProps {}

export interface CreateCampaignState {
  state: CreateCampaignStates;
  formValues: CreateFormFields;
  validationState: CreateFormFields;
}

export class CreateCampaign extends React.Component<
  CreateCampaignProps,
  CreateCampaignState
> {
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
    return validate(fields, {
      AdName: { presence: { allowEmpty: false } },
      ConversionName: { presence: { allowEmpty: false } },
      ConversionType: { presence: { allowEmpty: false } },
    });
  }

  async handleSubmit() {
    const validationState = this.validateFields(this.state.formValues);
    if (validationState) {
      this.setState(prev => ({
        ...prev,
        validationState,
      }));
    } else {
      this.setState(prev => ({
        ...prev,
        state: CreateCampaignStates.Submitting,
      }));
      // TODO: replace with api call
      await new Promise(resolve => {
        window.setTimeout(resolve, 1000);
      });
      this.setState(prev => ({
        ...prev,
        state: CreateCampaignStates.Submitted,
      }));
    }
  }

  handleFieldChange(fieldId: keyof CreateFormFields, value: any) {
    this.setState(prev => ({
      ...prev,
      formValues: {
        ...prev.formValues,
        [fieldId]: value,
      },
      validationState: {
        AdName: null,
        ConversionName: null,
        ConversionType: null,
      },
    }));
  }

  render() {
    const { state, validationState, formValues } = this.state;
    return (
      <MainLayout activePage={Pages.creating}>
        <BarLoader
          color={'#B6F7C1'}
          loading={state === CreateCampaignStates.Submitting}
        />
        
        {state !== CreateCampaignStates.Submitted ? (
          <CreateForm
            onSubmit={this.handleSubmit}
            onChange={this.handleFieldChange}
            disabled={state !== CreateCampaignStates.Unsubmitted}
            validationState={validationState}
            values={formValues}
          />
        ) : (
          <CreateSuccess
            onSubmit={this.handleSubmit}
            onChange={this.handleFieldChange}
            validationState={validationState}
            values={formValues}
          />
        )}
        <div className="form-shadow" />
      </MainLayout>
    );
  }
}
