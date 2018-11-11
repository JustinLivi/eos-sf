import { Api, JsonRpc, JsSignatureProvider, RpcError } from 'eosjs';
import * as React from 'react';
import { TextDecoder, TextEncoder } from 'text-encoding';

import { Pages } from '../components/Sidebar';
import { MainLayout } from '../layouts/Main';

// eosio endpoint
const endpoint = 'http://localhost:8888';

export interface BrowseState {
  noteTable: [];
}

export class Browse extends React.Component<{}, BrowseState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      noteTable: [], // to store the table rows from smart contract
    };
    this.handleFormEvent = this.handleFormEvent.bind(this);
  }

  // generic function to handle form events (e.g. "submit" / "reset")
  // push transactions to the blockchain by using eosjs
  async handleFormEvent(event: {
    preventDefault: () => void;
    target: {
      account: { value: any };
      privateKey: { value: any };
      note: { value: any };
    };
    type: any;
  }) {
    // stop default behaviour
    event.preventDefault();

    // collect form data
    const account = event.target.account.value;
    const privateKey = event.target.privateKey.value;
    const note = event.target.note.value;

    // prepare variables for the switch below to send transactions
    let actionName = '';
    let actionData = {};

    // define actionName and action according to event type
    switch (event.type) {
      case 'submit':
        actionName = 'update';
        actionData = {
          user: account,
          note,
        };
        break;
      default:
        return;
    }

    // eosjs function call: connect to the blockchain
    const rpc = new JsonRpc(endpoint);
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const api = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
    });
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: 'notechainacc',
              name: actionName,
              authorization: [
                {
                  actor: account,
                  permission: 'active',
                },
              ],
              data: actionData,
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        },
      );

      console.log(result);
      this.getTable();
    } catch (e) {
      console.log('Caught exception: ' + e);
      if (e instanceof RpcError) {
        console.log(JSON.stringify(e.json, null, 2));
      }
    }
  }

  // gets table data from the blockchain
  // and saves it into the component state: "noteTable"
  getTable() {
    const rpc = new JsonRpc(endpoint);
    rpc
      .get_table_rows({
        json: true,
        code: 'notechainacc', // contract who owns the table
        scope: 'notechainacc', // scope of the table
        table: 'notestruct', // name of the table as specified by the contract abi
        limit: 100,
      })
      .then(result => this.setState({ noteTable: result.rows }));
  }

  componentDidMount() {
    this.getTable();
  }

  render() {
    const { noteTable } = this.state;
    return (
      <MainLayout activePage={Pages.browse}>
        <div>{JSON.stringify(noteTable)}</div>
      </MainLayout>
    );
  }
}
