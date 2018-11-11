#include <unordered_map>
#include <eosiolib/eosio.hpp>

using namespace eosio;

#define INDEX_NONE -1

// Smart Contract Name: adchain
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

CONTRACT adchain : public eosio::contract
{
private:
   struct campaign
   {
      uint64_t unique_id;				// this is a uuid
      uint64_t target_users;		// number of users this campaign will sign up
      uint64_t activated_users; // number of users already activated through this campaign
      std::string campaign_name;	// the name of this campaign

      auto is_active() const { return activated_users < target_users; }
   };

   int64_t get_campaign_index(std::vector<campaign>& campaigns, uint64_t campaign_id)
   {
      for(int64_t i = 0; i < campaigns.size(); ++i) {
         if(campaigns[i].unique_id == campaign_id) {
            return i;
         }
      }
      return INDEX_NONE;
   }

   TABLE creators
   {
      name creator;
      uint64_t campaigns_counter = 0;
      std::vector<campaign> active_campaigns; // has many campaigns

      auto primary_key() const { return creator.value; }
   };

   // create a multi-index table to track ad campaigns
   typedef eosio::multi_index<"creators"_n, creators> users_table;

   users_table _users;

public:
   using contract::contract;

   // constructor
   adchain(name receiver, name code, datastream<const char *> ds) : contract(receiver, code, ds),
      _users(receiver, receiver.value) {}

   ACTION addcreator(name creator)
   {
      require_recipient(creator);

      users_table users(_code, _code.value);
      auto user = users.find(creator.value);
      eosio_assert(user == users.end(), "Cannot add a creator that was already added");

      // update the table to include a new creator
      users.emplace(creator, [&](auto &s) {
         s.creator = creator;
      });
   };

   ACTION newcampaign(name creator, std::string campaign_name, uint64_t target_users)
   {
      require_recipient(creator);

      users_table users(_code, _code.value);
      auto user = users.find(creator.value);

      // if the user is not yet registered, register them
      if(user == users.end()) {
         users.emplace(creator, [&](auto &s) {
            s.creator = creator;
         });
         user = users.find(creator.value);
      }
      
      users.modify(user, _self, [&](auto &s) {
         campaign new_campaign;
         new_campaign.unique_id = s.campaigns_counter++;
         new_campaign.campaign_name = campaign_name;
         new_campaign.target_users = target_users;
         s.active_campaigns.push_back(new_campaign);
      });
   }

   ACTION increment(name creator, uint64_t campaign_id)
   {
      require_auth(_self);
      require_recipient(creator);

      users_table users(_code, _code.value);
      auto user = users.find(creator.value);
      eosio_assert(user != users.end(), "User must create an account before incrementing users");

      users.modify(user, _self, [&](auto &s) {
         auto i = get_campaign_index(s.active_campaigns, campaign_id);
         eosio_assert(i != INDEX_NONE, "Failed to find campaign");

         s.active_campaigns[i].activated_users++;
         print("Increment successfully incremented active_users");
      });
   }
};

// specify the contract name, and export a public action: update
EOSIO_DISPATCH(adchain, (addcreator)(newcampaign)(increment))
