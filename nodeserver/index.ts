import { Api, JsonRpc, JsSignatureProvider, RpcError } from 'eosjs';
import express from 'express';
import { TextDecoder, TextEncoder } from 'text-encoding';

const app = express();

const endpoint = 'http://localhost:8888';

const rpc = new JsonRpc(endpoint);
const signatureProvider = new JsSignatureProvider([
  '5JD9AGTuTeD5BXZwGQ5AtwBqHK21aHmYnTetHgk1B3pjj7krT8N'
]);
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder()
});

app.post('/:creator/:campaignId', async (req, res) => {
  try {
    const result = await api.transact(
      {
        actions: [
          {
            account: 'esoio',
            name: 'increment',
            authorization: [
              {
                actor: 'esoio',
                permission: 'active'
              }
            ],
            data: {
              creator: req.params.creator,
              campaign_id: req.params.campaignId
            }
          }
        ]
      },
      {
        blocksBehind: 3,
        expireSeconds: 30
      }
    );

    console.log(result);
    res.send(result);
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
