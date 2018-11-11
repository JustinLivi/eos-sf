import React from 'react';
import { Button, Col, Form, FormGroup, Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { fetchTable, invalidateCache } from '../actions';
import { TextWithValidation } from '../components/inputs/TextWithValidation';
import buttonArrow from '../media/cta.png';
import { CacheStatus, State, StoreState } from '../store/stateDefinition';

export interface CompleteTaskProps {}

export interface CompleteTaskDispatchProps {
  shouldInvalidateCache: () => void;
  shouldFetchTable: () => void;
}

export enum CompleteTaskStates {
  Unsubmitted,
  Submitting,
  Submitted
}

export interface CompleteTaskState {
  completed: boolean;
  state: CompleteTaskStates;
}

type AllProps = StoreState & CompleteTaskDispatchProps & CompleteTaskProps;

export class UnboundCompleteTask extends React.Component<
  AllProps,
  CompleteTaskState
> {
  constructor(props: AllProps) {
    super(props);
    this.state = {
      completed: false,
      state: CompleteTaskStates.Unsubmitted
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { shouldFetchTable, cacheStatus } = this.props;
    if (cacheStatus !== CacheStatus.FETCHING) {
      shouldFetchTable();
    }
  }

  async handleSubmit() {
    const { shouldInvalidateCache } = this.props;
    this.setState(prev => ({
      ...prev,
      state: CompleteTaskStates.Submitting
    }));
    try {
      // hardcoded for simplicity
      await fetch('http://localhost:3002/useraaaaaaaa/0', {
        method: 'post'
      });
      this.setState({
        state: CompleteTaskStates.Submitted,
        completed: true
      });
      shouldInvalidateCache();
    } catch {
      this.setState(prev => ({
        ...prev,
        state: CompleteTaskStates.Unsubmitted
      }));
    }
  }

  render() {
    const { data } = this.props;
    const { completed, state } = this.state;
    return (
      <Grid fluid={true} className='page-main-body'>
        <Row>
          <Col sm={12}>
            {completed ? (
              <div className='eos-header-holder'>
                <div className='bracket top-bracket' />
                <h1 className='header'>Task Complete</h1>
                <div className='bracket bottom-bracket' />
              </div>
            ) : (
              <React.Fragment>
                <div className='eos-header-holder'>
                  <div className='bracket top-bracket' />
                  <h1 className='header'>Complete Task</h1>
                  <div className='bracket bottom-bracket' />
                </div>
                <Form horizontal={true}>
                  <FormGroup>
                    <Col sm={12} className='button-holder'>
                      <TextWithValidation
                        fieldId='placeholder'
                        fieldLabel='Instructions'
                        onChange={() => {}}
                        onSubmit={() => {}}
                        validationState={{
                          placeholder: null
                        }}
                        values={{
                          placeholder:
                            'Click COMPLETE when you have completed your task'
                        }}
                      />
                      <Button
                        onClick={this.handleSubmit}
                        disabled={state === CompleteTaskStates.Submitting}
                      >
                        <span>Complete </span>
                        <img src={buttonArrow} className='cta-arrow' />
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </React.Fragment>
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state: State) => state.campaigns;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      shouldFetchTable: fetchTable,
      shouldInvalidateCache: invalidateCache
    },
    dispatch
  );

export const CompleteTask = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnboundCompleteTask);
