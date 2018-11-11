#include <unordered_map>
#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>

using namespace eosio;

// Smart Contract Name: notechain
// Table struct:
//   notestruct: multi index table to store the notes
//     prim_key(uint64): primary key
//     user(name): account name for the user
//     note(string): the note message
//     timestamp(uint64): the store the last update block time
// Public method:
//   isnewuser => to check if the given account name has note in table or not
// Public actions:
//   update => put the note into the multi-index table and sign by the given account

// Replace the contract class name when you start your own project
CONTRACT adchain : public eosio::contract {
  private:
    struct ad_campaign {
      uint64_t      unique_id; // this is a uuid
      uint64_t      target_users; // number of users this campaign will sign up
      uint64_t      activated_users; // number of users already activated through this campaign
      asset         user_reward; // a token reward for new users

      auto primary_key() const { return unique_id; }
      auto is_active() const { return activated_users < target_users; }
    };

    TABLE creators {
      name creator;
      uint64_t campaigns_counter;
      std::unordered_map<uint64_t, ad_campaign> active_campaigns; // has many campaigns
      auto primary_key() const { return creator.value; }
      // constructor - set counter to zero
      creators(): campaigns_counter(0) {}
    };

    // create a multi-index table to track ad campaigns
    typedef eosio::multi_index<"creators"_n, creators> users_table;

    users_table _users;

  public:
    using contract::contract;

    // constructor
    adchain( name receiver, name code, datastream<const char*> ds ):
      contract( receiver, code, ds ),
      _users( receiver, receiver.value ) {}


    ACTION increment( name creator, uint64_t campaign_id ) {
      require_auth(creator);

      users_table users(_code, _code.value);
      auto user = users.find(creator.value);
      eosio_assert(user != users.end(), "User must create an account before incrementing users");

      users.modify( user, _self, [&]( auto& s ) {
         auto campaign = s.active_campaigns.find(campaign_id);
         eosio_assert(campaign != user->active_campaigns.end(), "Failed to find campaign");

         campaign->second.activated_users++;
         printf("Increment successfully incremented active_users to %u", campaign->second.activated_users);
      });
    }
};

// specify the contract name, and export a public action: update
EOSIO_DISPATCH( adchain, (increment) )
