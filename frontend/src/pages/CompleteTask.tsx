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

type AllProps = StoreState & CompleteTaskDispatchProps & CompleteTaskProps;

export class UnboundCompleteTask extends React.Component<AllProps> {
  constructor(props: AllProps) {
    super(props);
  }

  componentDidMount() {
    const { shouldInvalidateCache, shouldFetchTable, cacheStatus } = this.props;
    if (cacheStatus !== CacheStatus.FETCHING) {
      shouldFetchTable();
    }
  }

  render() {
    const { data } = this.props;
    return (
      <Grid fluid={true} className='page-main-body'>
        <Row>
          <Col sm={12}>
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
                  <Button>
                    <span>Complete </span>
                    <img src={buttonArrow} className='cta-arrow' />
                  </Button>
                </Col>
              </FormGroup>
            </Form>
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
