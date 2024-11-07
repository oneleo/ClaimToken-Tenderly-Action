# ClaimToken-Tenderly-Action

Tenderly Web3 Action for ClaimToken contract monitoring

# OffChainPaymaster-for-Tenderly-Action

## Prerequisites

1. Please create an account on [Tenderly](https://dashboard.tenderly.co/), then build a project

2. This action uses a Discord WebHook to handle ClaimToken messages. Request a WebHook URL from the designated Discord channel

3. In Tenderly’s Web3 Actions, add a secret "DISCORD_CLAIMTOKEN_CHANNEL_WEBHOOK" and set the WebHook URL

4. Similarly, create a Slack webhook at [https://my.slack.com/services/new/incoming-webhook](https://my.slack.com/services/new/incoming-webhook) and store its URL in the `SLACK_CLAIMTOKEN_CHANNEL_WEBHOOK` variable within Tenderly Web3 Secrets.

5. Create a Alchemy API key at [https://dashboard.alchemy.com/apps](https://dashboard.alchemy.com/apps) and store its key in the `ALCHEMY_API_KEY` variable within Tenderly Web3 Secrets.

6. Add a storage entry "CLAIM_TOKEN_LIST" as a string array, e.g.,

```
[{"chainId":10,"tokenSymbol":"UNI","tokenAddress":"0x6fd9d7AD17242c41f7131d257212c54A0e816691","totalAmount":1000000.123456789},{"chainId":10,"tokenSymbol":"USDT","tokenAddress":"0x94b008aA00579c1307B0EF2c499aD98a8ce58e58","totalAmount":1000000.123456789},{"chainId":42161,"tokenSymbol":"USDT","tokenAddress":"0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9","totalAmount":1000000.123456789},{"chainId":42161,"tokenSymbol":"DAI","tokenAddress":"0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1","totalAmount":1000000.123456789},{"chainId":42161,"tokenSymbol":"LON","tokenAddress":"0x55678cd083fcDC2947a0Df635c93C838C89454A3","totalAmount":1000000.1234567},{"chainId":42161,"tokenSymbol":"WBTC","tokenAddress":"0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f","totalAmount":1000000.1234567},{"chainId":42161,"tokenSymbol":"USDC","tokenAddress":"0xaf88d065e77c8cC2239327C5EDb3A432268e5831","totalAmount":1000000.1234567},{"chainId":42161,"tokenSymbol":"WETH","tokenAddress":"0x82aF49447D8a07e3bd95BD0d56f35241523fBab1","totalAmount":1000000.1234567},{"chainId":11155111,"tokenSymbol":"DAI","tokenAddress":"0xC8c4EFA54D6774F55DD09134a901865ff286321e","totalAmount":23332.4},{"chainId":11155111,"tokenSymbol":"LON","tokenAddress":"0x6C1851b852F05bdc7c0BE1A088532E4999fD94Fa","totalAmount":483183.4},{"chainId":11155111,"tokenSymbol":"USDC","tokenAddress":"0xa07DD8cb5A5c4254B5da0456AFD597A60a92b633","totalAmount":1000000.1234567},{"chainId":11155111,"tokenSymbol":"USDT","tokenAddress":"0x63b26b83c6f38433B2b6a7214fC2c569a4F4069A","totalAmount":492835.123456789},{"chainId":11155111,"tokenSymbol":"WBTC","tokenAddress":"0x7fA5E99D78FB17379C467B3dC5D0F63AcED6a80D","totalAmount":468.123456789},{"chainId":11155111,"tokenSymbol":"WETH","tokenAddress":"0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14","totalAmount":1000000.1234567},{"chainId":11155420,"tokenSymbol":"USDC","tokenAddress":"0x5fd84259d66Cd46123540766Be93DFE6D43130D7","totalAmount":1000000.1234567},{"chainId":421614,"tokenSymbol":"USDC","tokenAddress":"0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d","totalAmount":1000000.1234567}]
```

7. Install Tenderly CLI on local

```shell
brew tap tenderly/tenderly && brew install tenderly
```

## Deployment

1. Clone action from github

```shell
### Clone the project
git clone https://github.com/oneleo/ClaimToken-Tenderly-Action.git
cd ClaimToken-Tenderly-Action/
```

2. Set your Tenderly account and project name, format: [account name]/[project name]
   - In this case, account is `irarachen`, and project name is `monitoring`

```shell
code tenderly.yaml

### Edit tenderly.yaml
# ...
actions:
  irarachen/monitoring:
# ...
###
```

3. Set your network ID, target contract, and filter events using topics[0].
   - In this case, network ID = `11155111` (Sepolia), target contract = ClaimToken (`0x5ad1DAb7BfFdB622AF8B88882DDE9EDF1F01F17A`),
   - and filter for Claimed event (topics[0] = `0x8d57f9f57997efb57ed0839bfe4bb920cfb8004fd80cdac63be1acd419d4c28a`) from ClaimToken at `0x5ad1DAb7BfFdB622AF8B88882DDE9EDF1F01F17A`

```shell
code tenderly.yaml

### Edit tenderly.yaml
# ...
            filters:
              - network: 11155111
                # Transaction must come from the network with network ID 11155111 Sepolia
                status: success
                # Transaction must have succeeded
                to: 0x5ad1DAb7BfFdB622AF8B88882DDE9EDF1F01F17A
                # Transaction must have been sent to ClaimToken contract
                logEmitted:
                  # Transaction must have emitted a log entry
                  contract:
                    address: 0x5ad1DAb7BfFdB622AF8B88882DDE9EDF1F01F17A
                    # coming from the ClaimToken contract at this address
                  startsWith:
                    # and topics of the log entry must start with either one of these
                    - 0x8d57f9f57997efb57ed0839bfe4bb920cfb8004fd80cdac63be1acd419d4c28a
                    # Claimed(bytes32,address,string,address,uint256,bytes)
# ...
###
```

4. Login to Tenderly and deploy action

```
### Authenticate using your login token:
### You can get a token here: https://dashboard.tenderly.co/account/authorization
tenderly login

### Build your Action project:
tenderly actions build

### Deploy your Action to Tenderly Web3 Actions:
tenderly actions deploy
```

5. In `actions/claimTokenAction.ts`, when ClaimToken contract's token is fell below threshold, you'll receive the warning on Discord or Slack.

## Test

1. Run Tests

```
### Navigate to the actions directory and execute the tests
(cd actions/ && npm run test)
```
