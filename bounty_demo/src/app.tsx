import * as React from 'react';
import { Button, Col, Grid, Row } from 'react-bootstrap';

export enum CompleteTaskStates {
  Unsubmitted,
  Submitting,
  Submitted
}

export interface CompleteTaskState {
  completed: boolean;
  state: CompleteTaskStates;
}

export class App extends React.Component<{}, CompleteTaskState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      completed: false,
      state: CompleteTaskStates.Unsubmitted
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
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
    } catch {
      this.setState(prev => ({
        ...prev,
        state: CompleteTaskStates.Unsubmitted
      }));
    }
  }

  render() {
    const { completed, state } = this.state;
    return (
      <Grid>
        <Row>
          <Col sm={12}>
            <Row>
              <h1>Crowd Sourcing FTW</h1>
            </Row>
            <Row>
              <h2>The best crowd sourcing platform</h2>
            </Row>
            <Row>
              <h3>
                Crowd sourcing is great, especially when you can verify work
                completed!
              </h3>
            </Row>
            <Row>
              <br />
              {completed ? (
                <div>Task Complete!</div>
              ) : (
                <Button
                  onClick={this.handleSubmit}
                  disabled={state === CompleteTaskStates.Submitting}
                >
                  Complete my crowd sourced task
                </Button>
              )}
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}
