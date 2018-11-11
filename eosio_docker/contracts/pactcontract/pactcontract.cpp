#include <unordered_map>
#include <eosiolib/eosio.hpp>

using namespace eosio;

#define INDEX_NONE -1

CONTRACT pactcontract : public eosio::contract
{
  private:
	struct pact
	{
		uint64_t unique_id = -1;
		uint64_t activated_times = 0;
		uint64_t complete_threshold = 1;
		std::string name;

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
				u.active_pacts.push_back(createpact(user, u.pact_counter++, name, complete_threshold));
			});
		}
		else
		{
			users.modify(u, _self, [&](auto &u) {
				u.active_pacts.push_back(createpact(user, u.pact_counter++, name, complete_threshold));
			});
		}
	}

	pact createpact(name user, uint64_t pact_id, std::string name, uint64_t complete_threshold)
	{
		pact new_pact;
		new_pact.unique_id = pact_id;
		new_pact.name = name;
		new_pact.complete_threshold = complete_threshold;

		action(
			permission_level{get_self(), "active"_n},
			get_self(),
			"pactcreated"_n,
			std::make_tuple(user, pact_id))
			.send();

		return new_pact;
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

      u.active_pacts[i].activated_times++;
      auto pact = u.active_pacts[i];

			if (pact.activated_times >= pact.complete_threshold)
			{
				u.active_pacts.erase(u.active_pacts.begin() + i);

            action(
               permission_level{get_self(), "active"_n},
               get_self(),
               "pactcompleted"_n,
               std::make_tuple(user, pact.unique_id))
               .send();

				print("Activating the pact caused it to complete");
			}
			else
			{
				print("Pact successfully activated");
			}
		});
	}
   
   // these action only exists to notify UI of creation of pacts
	ACTION pactcreated(name user, uint64_t pact_id)
	{
		require_recipient(user);
	}
	ACTION pactcompleted(name user, uint64_t pact_id)
	{
		require_recipient(user);
	}
};

EOSIO_DISPATCH(pactcontract, (newpact)(pactcreated)(activatepact)(pactcompleted))
