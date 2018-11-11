#include <unordered_map>
#include <eosiolib/eosio.hpp>

using namespace eosio;

#define INDEX_NONE -1

CONTRACT pactcontract : public eosio::contract
{
 private:
	struct pact
	{
		uint64_t unique_id = -1;			// this is a uuid
		uint64_t activated_times = 0;		// number of times this pact was activated
		uint64_t complete_threshold = 1; // number of times before this pact is completed
		std::string name;						// the name of this pact

		auto is_active() const { return activated_times < complete_threshold; }
	};

	int64_t find_pact(std::vector<pact> & pacts, uint64_t pact_id)
	{
		for (int64_t i = 0; i < pacts.size(); ++i)
		{
			if (pacts[i].unique_id == pact_id)
			{
				return i;
			}
		}
		return INDEX_NONE;
	}

	TABLE user
	{
		name key;
		uint64_t pact_counter = 0;
		std::vector<pact> active_pacts;
		std::vector<pact> completed_pacts;

		auto primary_key() const { return key.value; }
	};

	typedef eosio::multi_index<"users"_n, user> users_table;
	users_table _users;

 public:
	using contract::contract;

	// constructor
	pactcontract(name receiver, name code, datastream<const char *> ds) : contract(receiver, code, ds),
																								 _users(receiver, receiver.value) {}

	ACTION newpact(name user, std::string name, uint64_t complete_threshold)
	{
		require_recipient(user);

		users_table users(_code, _code.value);
		auto u = users.find(user.value);

		// if the user is not yet registered, register them
		if (u == users.end())
		{
			users.emplace(user, [&](auto &u) {
				u.key = user;
				pact new_pact;
				new_pact.unique_id = u.pact_counter++;
				new_pact.name = name;
				new_pact.complete_threshold = complete_threshold;
				u.active_pacts.push_back(new_pact);
			});
		}
		else
		{
			users.modify(u, _self, [&](auto &u) {
				pact new_pact;
				new_pact.unique_id = u.pact_counter++;
				new_pact.name = name;
				new_pact.complete_threshold = complete_threshold;
				u.active_pacts.push_back(new_pact);
			});
		}
	}

	ACTION activatepact(name user, uint64_t pact_id)
	{
		require_auth(_self);
		require_recipient(user);

		users_table users(_code, _code.value);
		auto u = users.find(user.value);
		eosio_assert(u != users.end(), "User create a new pact before it can be activated");

		users.modify(u, _self, [&](auto &u) {
			auto i = find_pact(u.active_pacts, pact_id);
			eosio_assert(i != INDEX_NONE, "Failed to find pact to activate");
			
         auto pact = u.active_pacts[i];
         pact.activated_times++;

         if(pact.activated_times == pact.complete_threshold) {
            u.active_pacts.erase(u.active_pacts.begin() + i);
            u.completed_pacts.push_back(pact);
			   print("Activating the pact caused it to complete");
         } else {
			   print("Pact successfully activated");
         }
		});
	}
};

EOSIO_DISPATCH(pactcontract, (newpact)(activatepact))
