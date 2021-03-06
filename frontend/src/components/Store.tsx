import * as React from 'react';
import { Api, JsonRpc, JsSignatureProvider, RpcError } from 'eosjs';

const owner = "pactacc";
const endpoint = 'http://localhost:8888';

export interface Campaign {
  unique_id: number;
  complete_threshold: number;
  activated_times: number;
  user_reward: {
    symbol: string;
    amount: number;
  };
}

export interface DataType {
  active_pacts: Campaign[];
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
    const rpc = new JsonRpc(endpoint);
    rpc
      .get_table_rows({
        json: true,
        code: owner, // contract who owns the table
        scope: owner, // scope of the table
        table: 'users', // name of the table as specified by the contract abi
        limit: 100
      })
      .then(result => result && result.rows && this.setState({data: result.rows[0]}));
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate() {
    //this.fetch();
  }

  render() {
    return this.props.render({ data: this.state.data });
  }
}
