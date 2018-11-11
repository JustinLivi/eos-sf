const { Api, JsonRpc, JsSignatureProvider, RpcError } = require('eosjs');
const express = require('express');
const { TextDecoder, TextEncoder } = require('util');
const shell = require('shelljs');

const app = express();

const endpoint = 'http://localhost:8888';

const rpc = new JsonRpc(endpoint);
const signatureProvider = new JsSignatureProvider([
  '5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5'
]);
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder()
});

const owner = 'pactacc';
const creator = 'useraaaaaaaa';

app.post('/:creator/:campaignId', async (req, res) => {
  console.log(req.params);
  try {
    console.log(
      `docker exec eosio /opt/eosio/bin/cleos --url http://127.0.0.1:8888 push action pactacc increment '${JSON.stringify(
        {
          creator: req.params.creator,
          campaign_id: req.params.campaignId
        }
      )}' -p pactacc@active`
    );
    const result = shell.exec(
      `docker exec eosio /opt/eosio/bin/cleos --url http://127.0.0.1:8888 push action pactacc increment '${JSON.stringify(
        {
          creator: req.params.creator,
          campaign_id: req.params.campaignId
        }
      )}' -p pactacc@active`
    );

    console.log(result);
    res.send(result.stdout);
  } catch (e) {
    console.log('Caught exception: ' + e);
    if (e instanceof RpcError) {
      console.log(JSON.stringify(e.json, null, 2));
    }
    // our errors are your errors ;)
    res.status(400);
    res.send('Invalid request');
  }
});
app.listen(3002, () => console.log('listening on port 3002'));
