# Backend for transaction history
We get the transaction history from Harmony RPC call `hmyv2_getTransactionHistory`, decode the payload/data and store the data on Firebase Realtime Database. 

## Requirements
- `python3 -m pip install -r requirements.txt`
- Connect to Firebase
	- [Create a Firebase project](https://console.firebase.google.com/u/0/)
	- [Add the Firebase Admin Python SDK](https://firebase.google.com/docs/admin/setup#add-sdk)
	- [Generate a private key file for your service account and initialize the SDK](https://firebase.google.com/docs/admin/setup#initialize-sdk)


## Instructions
- Create a tmux new session `tmux new -s harmonauts`
- RUN `python3 [PATH]/get_punk_txs_history.py --endpoints [ENDPOINTS] --address [Smart contract address]`
- Get decoded transaction history through Realtime Database API: `curl https:/{firebase project name}.firebaseio.com/{reference name}.json` e.g. `curl https://harmony-explorer-mainnet.firebaseio.com/harmony-punk`

## Output
- `data`: save transaction history, transaction page, and transaction hash
- `log`: record file updating info
- `credential`: store the firebase private key json file 
