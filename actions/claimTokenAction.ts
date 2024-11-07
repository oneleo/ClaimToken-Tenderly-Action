import {
  ActionFn,
  Context,
  Event,
  Log,
  TransactionEvent,
} from "@tenderly/actions";
import {
  toBigInt,
  toNumber,
  toBeHex,
  hexlify,
  getAddress,
  dataSlice,
  AbiCoder,
  Contract,
  JsonRpcProvider,
} from "ethers";
import axios from "axios";

// Constants for percentage and target decimals
const bufferAmountPercentage = 20n;
const alarmAmountPercentage = 10n;
const storageTotalAmountTargetDecimals = 6;

// Identifier for Claimed event
// = keccak256(abi.encodePacked("Claimed(bytes32,address,string,address,uint256,bytes)"))
const claimedId = hexlify(
  "0x8d57f9f57997efb57ed0839bfe4bb920cfb8004fd80cdac63be1acd419d4c28a"
);

type ClaimTokenFromStorage = {
  chainId: number;
  tokenSymbol: string;
  tokenAddress: string;
  totalAmount: number;
};

// Structure for Claimed event
export interface ClaimedEventParams {
  claimHash: string; // bytes32
  tokenAddress: string; // address
  eventID: string; // string
  userAddress: string; // address
  amount: bigint; // uint256
  signerSignature: string; // bytes
}

// Logs JSON data, converting BigInt to string
const jsonStringify = (data: any): string => {
  return JSON.stringify(
    data,
    (_, value) => {
      return typeof value === "bigint" ? toBeHex(value) : value;
    },
    2
  );
};

// Prints JSON data to console with a title
export const printJson = (title: string, data: Object) => {
  console.log(`${title}: ${jsonStringify(data)}`);
};

// Parses and validates the ClaimToken list from JSON
const parseClaimTokenList = (
  claimTokenList: string
): ClaimTokenFromStorage[] => {
  try {
    // Parse JSON and convert specific fields
    const parsedData = JSON.parse(claimTokenList, (key, value) => {
      if (key === "totalAmount") {
        return Number(value);
      }
      if (key === "tokenAddress") {
        return getAddress(value);
      }
      return value;
    });

    // Validate each item in the parsed data
    parsedData.forEach((item: any) => {
      if (
        typeof item.chainId !== "number" ||
        typeof item.tokenSymbol !== "string" ||
        typeof item.tokenAddress !== "string" ||
        typeof item.totalAmount !== "number"
      ) {
        throw new Error(`Invalid ClaimToken data: ${JSON.stringify(item)}`);
      }
    });

    // Return validated data
    return parsedData as ClaimTokenFromStorage[];
  } catch (error) {
    console.error(`Failed to parse claimTokenList: ${error}`);
    return [];
  }
};

// Decodes the Claimed event logs and filters based on token addresses
const parseClaimedEvent = (params: {
  logs: Log[];
  filterTokens?: string[];
}): ClaimedEventParams[] => {
  const eventLogs = params.logs.filter(
    (log) => hexlify(log.topics[0]) === claimedId
  );

  // Log warning if no matching events are found
  if (eventLogs.length === 0) {
    console.warn(`Claimed event not found`);
    return [];
  }

  // Use reduce to accumulate valid events
  const decodedClaimedEvents = eventLogs.reduce<ClaimedEventParams[]>(
    (claimed, eventLog) => {
      const tokenAddress = getAddress(dataSlice(eventLog.topics[1], 12));

      // Skip if the tokenAddress doesn't match the filter
      if (params.filterTokens && !params.filterTokens.includes(tokenAddress)) {
        return claimed;
      }

      const userAddress = getAddress(dataSlice(eventLog.topics[2], 12));

      const amount = toBigInt(eventLog.topics[3]);

      const [claimHash, eventID, signerSignature] =
        AbiCoder.defaultAbiCoder().decode(
          ["bytes32", "string", "bytes"],
          eventLog.data
        );

      // Push valid event to result
      claimed.push({
        claimHash: hexlify(claimHash),
        tokenAddress,
        eventID,
        userAddress,
        amount,
        signerSignature: hexlify(signerSignature),
      });

      return claimed;
    },
    []
  );

  if (decodedClaimedEvents.length === 0) {
    console.warn(`No matching tokens found in Claimed events`);
  }

  return decodedClaimedEvents;
};

// Gets RPC URL based on chain ID and API key
const getRpcUrl = (chainId: number, alchemyApiKey: string): string | null => {
  const baseUrls: Record<number, string> = {
    1: `https://eth-mainnet.g.alchemy.com/v2/`,
    10: `https://opt-mainnet.g.alchemy.com/v2/`,
    42161: `https://arb-mainnet.g.alchemy.com/v2/`,
    11155111: `https://eth-sepolia.g.alchemy.com/v2/`,
    11155420: `https://opt-sepolia.g.alchemy.com/v2/`,
    421614: `https://arb-sepolia.g.alchemy.com/v2/`,
  };

  return baseUrls[chainId] ? `${baseUrls[chainId]}${alchemyApiKey}` : null;
};

// Gets network name based on chain ID
const getNetworkName = (chainId: number): string | null => {
  const baseNames: Record<number, string> = {
    1: `Mainnet`,
    10: `Optimism Mainnet`,
    42161: `Arbitrum One`,
    11155111: `Sepolia`,
    11155420: `Optimism Sepolia Testnet`,
    421614: `Arbitrum Sepolia`,
  };

  return baseNames[chainId] ? `${baseNames[chainId]}` : `Unknown`;
};

// Gets transaction scan URL for a given chain ID and transaction hash
const getTransactionLogScanUrl = (
  chainId: number,
  transactionHash: string
): string => {
  const baseUrls: Record<number, string> = {
    1: `https://etherscan.io/tx/`,
    10: `https://optimistic.etherscan.io/tx/`,
    42161: `https://arbiscan.io/tx/`,
    11155111: `https://sepolia.etherscan.io/tx/`,
    11155420: `https://sepolia-optimism.etherscan.io/tx/`,
    421614: `https://sepolia.arbiscan.io/tx/`,
  };

  return baseUrls[chainId]
    ? `${baseUrls[chainId]}${transactionHash}#eventlog`
    : `Unknown`;
};

// Gets scan URL to view token balances for a specific account
const getTokenScanUrl = (
  chainId: number,
  accountAddress: string,
  tokenAddress: string
): string => {
  const baseUrls: Record<number, string> = {
    1: `https://etherscan.io/token/`,
    10: `https://optimistic.etherscan.io/token/`,
    42161: `https://arbiscan.io/token/`,
    11155111: `https://sepolia.etherscan.io/token/`,
    11155420: `https://sepolia-optimism.etherscan.io/token/`,
    421614: `https://sepolia.arbiscan.io/token/`,
  };

  return baseUrls[chainId]
    ? `${baseUrls[chainId]}${tokenAddress}?a=${accountAddress}`
    : `Unknown`;
};

// Gets token balance and decimals using the Alchemy API
const getTokenBalance = async (
  chainId: number,
  tokenAddress: string,
  accountAddress: string,
  alchemyApiKey?: string
): Promise<{ balance: bigint; decimals: number }> => {
  if (!alchemyApiKey) {
    console.error(`Alchemy api key not found`);
    return { balance: 0n, decimals: -1 };
  }

  const rpcUrl = getRpcUrl(chainId, alchemyApiKey);

  if (!rpcUrl) {
    console.error(`Can not get balance: chainId not found`);
    return { balance: 0n, decimals: -1 };
  }

  const provider = new JsonRpcProvider(rpcUrl);

  const erc20Contract = new Contract(
    tokenAddress,
    [
      "function balanceOf(address account) external view returns (uint256)",
      "function decimals() public view returns (uint8)",
    ],
    // new JsonRpcProvider(rpcUrl)
    provider
  );

  try {
    const balance = toBigInt(await erc20Contract.balanceOf(accountAddress));
    const decimals = toNumber(await erc20Contract.decimals());

    return {
      balance,
      decimals,
    };
  } catch (error) {
    console.error(`Failed to get token balance: ${error}`);
    return { balance: 0n, decimals: -1 };
  }
};

// Formats the token balance with decimal precision
const formatTokenBalance = (balance: bigint, decimals: number): string => {
  const integerPart = balance / 10n ** BigInt(decimals);
  const decimalPart = balance % 10n ** BigInt(decimals);

  const formattedBalance = `${integerPart}.${decimalPart
    .toString()
    .padStart(Number(decimals), "0")}`;

  return formattedBalance;
};

// Sends notifications to Discord webhook
const notifyDiscord = async (
  text: string,
  content: string,
  webhookLink?: string
) => {
  if (!webhookLink) {
    console.error(`Discord webhook link not found`);
    return;
  }

  const discordText = `🐥 ${text}:\n${content}`;

  const data = {
    content: `${discordText}`,
  };

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  console.log(`Sending to Discord: ${discordText}`);

  try {
    // Send message to Discord
    const response = await axios.post(webhookLink, data, config);

    // Throw error if response status is not 204
    if (response.status !== 204) {
      throw new Error(
        `Failed to send Discord notification: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(`Error sending Discord notification: ${error}`);
  }
};

// Sends notifications to Slack webhook
const notifySlack = async (
  text: string,
  content: string,
  webhookLink?: string
) => {
  if (!webhookLink) {
    console.error(`Slack webhook link not found`);
    return;
  }

  const slackText = `🐥 ${text}:\n${content}`;

  const payload = {
    username: "webhookbot",
    text: slackText,
    icon_emoji: ":money:",
  };

  console.log(`Sending to Slack: ${slackText}`);

  try {
    // Send message to Slack
    const response = await axios.post(webhookLink, payload);

    // Throw error if response status is not 204
    if (response.status !== 200) {
      throw new Error(
        `Failed to send Slack notification: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(`Error sending Slack notification: ${error}`);
  }
};

// Append a value to a JSON array in Tenderly Web3 Action storage
const pushToStorage = async (context: Context, key: string, value: any) => {
  let jsonData = await context.storage.getJson(key);
  if (jsonData && Object.keys(jsonData).length === 0) {
    jsonData = [];
  }
  jsonData.push(JSON.parse(jsonStringify(value)));
  await context.storage.putJson(key, jsonData);
};

export const actionFn: ActionFn = async (context: Context, event: Event) => {
  //   printJson("context", context);
  //   printJson("event", event);

  const claimTokenList = parseClaimTokenList(
    await context.storage.getStr("CLAIM_TOKEN_LIST")
  );

  if (claimTokenList.length === 0) {
    console.error(`Claim token list not found`);
    return;
  }

  //   printJson("claimTokenList", claimTokenList);

  // Configure secret: https://dashboard.tenderly.co/IraraChen/monitoring/actions/secrets
  // Example: DISCORD_CLAIMTOKEN_CHANNEL_WEBHOOK=https://discord.com/api/webhooks/xxx/xxx
  // Example: SLACK_CLAIMTOKEN_CHANNEL_WEBHOOK=https://hooks.slack.com/services/xxx/xxx/xxx
  const discordWebhookLink = await context.secrets.get(
    "DISCORD_CLAIMTOKEN_CHANNEL_WEBHOOK"
  );
  console.log(`discordWebhookLink: ${discordWebhookLink}`);

  const slackWebhookLink = await context.secrets.get(
    "SLACK_CLAIMTOKEN_CHANNEL_WEBHOOK"
  );
  console.log(`slackWebhookLink: ${slackWebhookLink}`);

  const alchemyApiKey = await context.secrets.get("ALCHEMY_API_KEY");
  console.log(`alchemyApiKey: ${alchemyApiKey}`);

  // Cast event to TransactionEvent type
  const transactionEvent = event as TransactionEvent;
  if (transactionEvent.hash === undefined) {
    return;
  }

  const chainId = parseInt(transactionEvent.network);
  const claimTokenAddress = getAddress(transactionEvent.to!);
  const logs = transactionEvent.logs as Log[];

  // Filter tokens by target chain ID
  const filteredClaimTokenListFromStorage = claimTokenList.filter(
    (token) => token.chainId === chainId
  );

  const tokenAddressesFromStorage = filteredClaimTokenListFromStorage.map(
    (token) => token.tokenAddress
  );

  printJson("tokenAddressesFromStorage", tokenAddressesFromStorage);

  // Fetch Claimed logs if tokenAddress is in target tokens
  const claimedLogs = parseClaimedEvent({
    logs,
    filterTokens: tokenAddressesFromStorage,
  });

  printJson("claimedLogs", claimedLogs);

  // Process each user operation processed log
  for (const claimedLog of claimedLogs) {
    const token = filteredClaimTokenListFromStorage.find(
      (token) => token.tokenAddress === claimedLog.tokenAddress
    );

    if (!token) {
      continue;
    }

    await pushToStorage(context, "ClaimedEvent", claimedLog);

    const totalAmount = token.totalAmount;
    const tokenSymbol = token.tokenSymbol;

    const tokenOfClaimTokenContract = await getTokenBalance(
      chainId,
      claimedLog.tokenAddress,
      claimTokenAddress,
      alchemyApiKey
    );

    const transactionScanUrl = getTransactionLogScanUrl(
      chainId,
      transactionEvent.hash
    );

    const tokenAddressScanUrl = getTokenScanUrl(
      chainId,
      claimTokenAddress,
      claimedLog.tokenAddress
    );

    const networkName = getNetworkName(chainId);

    if (tokenOfClaimTokenContract.decimals === -1) {
      const text = `(Tenderly Web3 Actions) Rpc error: unable to retrieve ClaimToken contract's ${tokenSymbol} balance on ${networkName}, triggered by Claimed event in tx: ${transactionScanUrl} .`;

      console.error(`text: ${text}`);

      // Notify Discord
      await notifyDiscord(text, jsonStringify(claimedLog), discordWebhookLink);

      // Notify Slack
      await notifySlack(text, jsonStringify(claimedLog), slackWebhookLink);
      continue;
    }

    console.log(`decimals:\t${tokenOfClaimTokenContract.decimals}`);
    console.log(`balance:\t${tokenOfClaimTokenContract.balance}`);

    const alarmAmount =
      (BigInt(
        Math.floor(totalAmount * 10 ** storageTotalAmountTargetDecimals)
      ) *
        bufferAmountPercentage *
        alarmAmountPercentage *
        10n ** BigInt(tokenOfClaimTokenContract.decimals)) /
      10n ** BigInt(storageTotalAmountTargetDecimals) /
      10n ** 4n;

    console.log(`alarmAmount:\t${alarmAmount}`);

    const formattedBalance = formatTokenBalance(
      tokenOfClaimTokenContract.balance,
      tokenOfClaimTokenContract.decimals
    );

    const formattedAlarmAmount = formatTokenBalance(
      alarmAmount,
      tokenOfClaimTokenContract.decimals
    );

    if (alarmAmount >= tokenOfClaimTokenContract.balance) {
      const text = `(Tenderly Web3 Actions) ClaimToken contract's ${tokenSymbol} (${tokenAddressScanUrl} ) balance (${formattedBalance}) on ${networkName} fell below threshold (${formattedAlarmAmount}), triggered by Claimed event in tx: ${transactionScanUrl} .`;

      console.warn(`text: ${text}`);

      // Notify Discord
      await notifyDiscord(text, jsonStringify(claimedLog), discordWebhookLink);

      // Notify Slack
      await notifySlack(text, jsonStringify(claimedLog), slackWebhookLink);
      return;
    }
    console.log(
      `ClaimToken contract's ${tokenSymbol} (${tokenAddressScanUrl} ) balance (${formattedBalance}) on ${networkName} exceeds threshold (${formattedAlarmAmount}), so it's sufficient.`
    );
  }

  console.log(`Tenderly Web3 Action script completed`);
};
