import * as React from 'react';
import { Api, JsonRpc, JsSignatureProvider, RpcError } from 'eosjs';

const owner = "adchainacc";
const endpoint = 'http://localhost:8888';

export interface Campaign {
  unique_id: number;
  target_users: number;
  activated_users: number;
  user_reward: {
    symbol: string;
    amount: number;
  };
}

export interface DataType {
  active_campaigns: Campaign[];
}

export interface Storable<DataType> {
  data: DataType;
}

export interface StoreProps<DataType> {
  defaultData: DataType;
  render: (props: { data: DataType }) => React.ReactElement<Storable<DataType>>;
}

export interface StoreState<DataType> {
  data: DataType;
}

export class Store<DataType> extends React.Component<
  StoreProps<DataType>,
  StoreState<DataType>
> {
  constructor(props: StoreProps<DataType>) {
    super(props);
    this.state = { data: props.defaultData };
  }

  fetch() {
    // TODO: make this work
    const rpc = new JsonRpc(endpoint);
    rpc
      .get_table_rows({
        json: true,
        code: owner, // contract who owns the table
        scope: owner, // scope of the table
        table: 'creators', // name of the table as specified by the contract abi
        limit: 100
      })
      .then(result => console.log(result.rows.toString()));
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate() {
    this.fetch();
  }

  render() {
    return this.props.render({ data: this.state.data });
  }
}
