mkdir -p ./eosio_docker/compiled_contracts
mkdir -p ./eosio_docker/compiled_contracts/adchain
eosio-cpp -abigen "./eosio_docker/contracts/adchain/adchain.cpp" -o "./eosio_docker/compiled_contracts/adchain/adchain.wasm" --contract "adchain"

docker exec eosio cleos set contract adchainacc compiled_contracts/adchain