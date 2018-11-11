import './CreateCampaign.css';

import { Api, JsonRpc, JsSignatureProvider, RpcError } from 'eosjs';
import * as React from 'react';
import { connect } from 'react-redux';
import { BarLoader } from 'react-spinners';
import { bindActionCreators, Dispatch } from 'redux';
import { validate } from 'validate.js';

import { invalidateCache } from '../actions';
import { CreateForm, CreateFormFields } from '../components/CreateForm';
import { CreateSuccess } from '../components/CreateSuccess';
import { Pages } from '../components/Sidebar';
import { MainLayout } from '../layouts/Main';

const owner = 'pactacc';
const user = 'useraaaaaaaa';
const endpoint = 'http://localhost:8888';
const privateKey = '5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5';

export enum CreateCampaignStates {
  Unsubmitted,
  Submitting,
  Submitted,
  Failed
}

export interface CreateCampaignProps {}

export interface CreateCampaignDispatchProps {
  shouldInvalidateCache: () => void;
}

export interface CreateCampaignState {
  state: CreateCampaignStates;
  formValues: CreateFormFields;
  validationState: CreateFormFields;
}

type AllProps = CreateCampaignProps & CreateCampaignDispatchProps;

export class UnboundCreateCampaign extends React.Component<
  AllProps,
  CreateCampaignState
> {
  constructor(props: AllProps) {
    super(props);
    this.state = {
      state: CreateCampaignStates.Unsubmitted,
      formValues: {
        AdName: undefined,
        ConversionName: undefined,
        ConversionType: undefined
      },
      validationState: {
        AdName: null,
        ConversionName: null,
        ConversionType: null
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  validateFields(fields: Partial<CreateFormFields>) {
    return validate(fields, {
      AdName: { presence: { allowEmpty: false } },
      ConversionName: {
        presence: { allowEmpty: false },
        numericality: {
          onlyInteger: true,
          greaterThan: 0
        }
      },
      ConversionType: { presence: { allowEmpty: false } }
    });
  }

  async handleSubmit() {
    const { shouldInvalidateCache } = this.props;
    const validationState = this.validateFields(this.state.formValues);
    if (validationState) {
      this.setState(prev => ({
        ...prev,
        validationState
      }));
    } else {
      this.setState(prev => ({
        ...prev,
        state: CreateCampaignStates.Submitting
      }));
    }

    const rpc = new JsonRpc(endpoint);
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const api = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder()
    });
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: owner,
              name: 'newpact',
              authorization: [
                {
                  actor: user,
                  permission: 'active'
                }
              ],
              data: {
                user: user,
                name: this.state.formValues.AdName,
                complete_threshold: this.state.formValues.ConversionName
              }
            }
          ]
        },
        {
          blocksBehind: 3,
          expireSeconds: 30
        }
      );

      this.setState(prev => ({
        ...prev,
        state: CreateCampaignStates.Submitted
      }));
      console.log(result);
      shouldInvalidateCache();
    } catch (e) {
      console.log('Caught exception: ' + e);
      if (e instanceof RpcError) {
        console.log(JSON.stringify(e.json, null, 2));
      }

      this.setState(prev => ({
        ...prev,
        state: CreateCampaignStates.Unsubmitted
      }));
    }
  }

  handleFieldChange(fieldId: keyof CreateFormFields, value: any) {
    this.setState(prev => ({
      ...prev,
      formValues: {
        ...prev.formValues,
        [fieldId]: value
      },
      validationState: {
        AdName: null,
        ConversionName: null,
        ConversionType: null
      }
    }));
  }

  render() {
    const { state, validationState, formValues } = this.state;
    return (
      <MainLayout activePage={Pages.creating}>
        <BarLoader
          className="loading-bar"
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

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      shouldInvalidateCache: invalidateCache
    },
    dispatch
  );

export const CreateCampaign = connect(
  undefined,
  mapDispatchToProps
)(UnboundCreateCampaign);
