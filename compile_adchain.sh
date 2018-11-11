mkdir -p ./eosio_docker/compiled_contracts
mkdir -p ./eosio_docker/compiled_contracts/adchain
eosio-cpp -abigen "./eosio_docker/contracts/adchain/adchain.cpp" -o "./eosio_docker/compiled_contracts/adchain/adchain.wasm" --contract "adchain"

docker exec eosio_notechain_container cleos set contract eosio compiled_contracts/adchain