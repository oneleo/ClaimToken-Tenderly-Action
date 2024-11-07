import { TransactionEvent } from "@tenderly/actions";
// Refer: https://sepolia.etherscan.io/tx/0x0d7bab71d60ca6ccd63806a74595cbd955a34e6e81fe93db6c0c02cd8ebd911a
export const claimedUsdtPayload: TransactionEvent = {
  network: "11155111",
  blockHash:
    "0x513eaa25dae82972084bd53aff5d33f0d1376040077dcd780dc13ad3f97e3aed",
  blockNumber: 7021000,
  hash: "0x0d7bab71d60ca6ccd63806a74595cbd955a34e6e81fe93db6c0c02cd8ebd911a",
  transactionHash:
    "0x0d7bab71d60ca6ccd63806a74595cbd955a34e6e81fe93db6c0c02cd8ebd911a",
  from: "0x24F40B2197cC584A81BCFc4eCD7a3230D0E6A93b",
  to: "0x5ad1DAb7BfFdB622AF8B88882DDE9EDF1F01F17A",
  logs: [
    {
      address: "0x63b26b83c6f38433B2b6a7214fC2c569a4F4069A",
      topics: [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x0000000000000000000000005ad1dab7bffdb622af8b88882dde9edf1f01f17a",
        "0x000000000000000000000000680c3e14f0feb3ff992bc840273a5d046d6213a0",
      ],
      data: "0x00000000000000000000000000000000000000000000000000000000001e5d70",
    },
    {
      address: "0x5ad1DAb7BfFdB622AF8B88882DDE9EDF1F01F17A",
      topics: [
        "0x8d57f9f57997efb57ed0839bfe4bb920cfb8004fd80cdac63be1acd419d4c28a",
        "0x00000000000000000000000063b26b83c6f38433b2b6a7214fc2c569a4f4069a",
        "0x000000000000000000000000680c3e14f0feb3ff992bc840273a5d046d6213a0",
        "0x00000000000000000000000000000000000000000000000000000000001e5d70",
      ],
      data: "0xde61a034d408a6bb5e798eee3c1825c9f32e0b0422383e294e978c9ca068f335000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000864613031643938330000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041e36d1a94c4c9f5a26731ee5e38c6f9e3425e535b61b12385e6671a102de067732ae91cd996a2b23132c35af3155b298ebf0d114fda31429e289e95bb6abbd4eb1b00000000000000000000000000000000000000000000000000000000000000",
    },
  ],
  input:
    "0xa25d97d200000000000000000000000063b26b83c6f38433b2b6a7214fc2c569a4f4069a00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000680c3e14f0feb3ff992bc840273a5d046d6213a000000000000000000000000000000000000000000000000000000000001e5d7000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000000864613031643938330000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041e36d1a94c4c9f5a26731ee5e38c6f9e3425e535b61b12385e6671a102de067732ae91cd996a2b23132c35af3155b298ebf0d114fda31429e289e95bb6abbd4eb1b00000000000000000000000000000000000000000000000000000000000000",
  value: "0x0",
  nonce: "0x33",
  gas: "0x1938a",
  gasUsed: "0x17fcc",
  cumulativeGasUsed: "0xdf4920",
  gasPrice: "0x998599e8",
  gasTipCap: "0x8664ad",
  gasFeeCap: "0x10d2d2621",
};

// Refer: https://sepolia.etherscan.io/tx/0x92530a2291301c70f9604fe91967a7a21da308238fac79629df080b397d4a73e
export const claimedDaiPayload: TransactionEvent = {
  network: "11155111",
  blockHash:
    "0x97c14ad2426fd5292aa861584efa273df9e0437f5cb781165eb6800e0c3d784a",
  blockNumber: 7022082,
  hash: "0x92530a2291301c70f9604fe91967a7a21da308238fac79629df080b397d4a73e",
  transactionHash:
    "0x92530a2291301c70f9604fe91967a7a21da308238fac79629df080b397d4a73e",
  from: "0x8096334c0bdc58f7e86ec38bcde3a43afa04d477",
  to: "0x5ad1dab7bffdb622af8b88882dde9edf1f01f17a",
  logs: [
    {
      address: "0xc8c4efa54d6774f55dd09134a901865ff286321e",
      topics: [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x0000000000000000000000005ad1dab7bffdb622af8b88882dde9edf1f01f17a",
        "0x0000000000000000000000008cae76b6280054e7aa92ea54d1b49f4cbe306705",
      ],
      data: "0x0000000000000000000000000000000000000000000000001b9de674df070000",
    },
    {
      address: "0x5ad1dab7bffdb622af8b88882dde9edf1f01f17a",
      topics: [
        "0x8d57f9f57997efb57ed0839bfe4bb920cfb8004fd80cdac63be1acd419d4c28a",
        "0x000000000000000000000000c8c4efa54d6774f55dd09134a901865ff286321e",
        "0x0000000000000000000000008cae76b6280054e7aa92ea54d1b49f4cbe306705",
        "0x0000000000000000000000000000000000000000000000001b9de674df070000",
      ],
      data: "0x3158bb5a8a4c2c26b9526d1ec1338d5f80fd9df3423b8d2aa0705dc4bd469120000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000083639306635396532000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004124449d5e98da52c6c01f6934b1f7945323fbfc14c46cee84263b37391f68b0b00fbd3a8ec0b1d65967e3f7ad8ee929edc69f1f2d654c1decad3c88848c52c7da1c00000000000000000000000000000000000000000000000000000000000000",
    },
  ],
  input:
    "0xa25d97d2000000000000000000000000c8c4efa54d6774f55dd09134a901865ff286321e00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000008cae76b6280054e7aa92ea54d1b49f4cbe3067050000000000000000000000000000000000000000000000001b9de674df07000000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000083639306635396532000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004124449d5e98da52c6c01f6934b1f7945323fbfc14c46cee84263b37391f68b0b00fbd3a8ec0b1d65967e3f7ad8ee929edc69f1f2d654c1decad3c88848c52c7da1c00000000000000000000000000000000000000000000000000000000000000",
  value: "0x",
  nonce: "0x2d",
  gas: "0x193a2",
  gasUsed: "0x17fe4",
  cumulativeGasUsed: "0xdee8be",
  gasPrice: "0x037069d2d2",
  gasTipCap: "0x8664ad",
  gasFeeCap: "0x05efb2fda3",
};

// Refer: https://sepolia.etherscan.io//tx/0x47daaef120c540cea5b0db3e2c111c0b0400e2d52f2d46799dcbaba00ad7f969
export const claimedWbtcPayload: TransactionEvent = {
  network: "11155111",
  blockHash:
    "0x86a1fa7dfdd4ab4d0e05b3191460cbe1b8bdabb4484114c828ebcc8d888edb13",
  blockNumber: 7010949,
  hash: "0x47daaef120c540cea5b0db3e2c111c0b0400e2d52f2d46799dcbaba00ad7f969",
  transactionHash:
    "0x47daaef120c540cea5b0db3e2c111c0b0400e2d52f2d46799dcbaba00ad7f969",
  from: "0x8096334C0BDC58F7e86ec38bcDE3A43AFA04D477",
  to: "0x5ad1DAb7BfFdB622AF8B88882DDE9EDF1F01F17A",
  logs: [
    {
      address: "0x7fA5E99D78FB17379C467B3dC5D0F63AcED6a80D",
      topics: [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x0000000000000000000000005ad1dab7bffdb622af8b88882dde9edf1f01f17a",
        "0x000000000000000000000000c318cec98eadfff02ad2cbb525b047bdb5215d17",
      ],
      data: "0x00000000000000000000000000000000000000000000000000000000001e8480",
    },
    {
      address: "0x5ad1DAb7BfFdB622AF8B88882DDE9EDF1F01F17A",
      topics: [
        "0x8d57f9f57997efb57ed0839bfe4bb920cfb8004fd80cdac63be1acd419d4c28a",
        "0x0000000000000000000000007fa5e99d78fb17379c467b3dc5d0f63aced6a80d",
        "0x000000000000000000000000c318cec98eadfff02ad2cbb525b047bdb5215d17",
        "0x00000000000000000000000000000000000000000000000000000000001e8480",
      ],
      data: "0x63cd3c27faf30ec5aaefb943871fa2cab93ccfbefe3d693a3d65b1265fbc303b000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000839613231366566320000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041660ee69a75588ee309483bbc09c819525c502c8e4d7e89895c2830b743756a015e15858ac4760f467d17fe7acac02c7233aad969c51ef8f6938cf5e4258c25b71b00000000000000000000000000000000000000000000000000000000000000",
    },
  ],
  input:
    "0xa25d97d20000000000000000000000007fa5e99d78fb17379c467b3dc5d0f63aced6a80d00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000c318cec98eadfff02ad2cbb525b047bdb5215d1700000000000000000000000000000000000000000000000000000000001e848000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000000839613231366566320000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041660ee69a75588ee309483bbc09c819525c502c8e4d7e89895c2830b743756a015e15858ac4760f467d17fe7acac02c7233aad969c51ef8f6938cf5e4258c25b71b00000000000000000000000000000000000000000000000000000000000000",
  value: "0x0",
  nonce: "0x1a",
  gas: "0x1938a",
  gasUsed: "0x17fcc",
  cumulativeGasUsed: "0x10e5503",
  gasPrice: "0x236ac02cf",
  gasTipCap: "0x8664ad",
  gasFeeCap: "0x4211795ad",
};

// Refer: https://sepolia.etherscan.io/tx/0xe05d9cd319824a8cfcb2024557ee14d1ed3bd156d7a823f117588efea5dc9d25
export const claimedLonPayload: TransactionEvent = {
  network: "11155111",
  blockHash:
    "0xf59e4618d2361e9cafb966320b37086a36c8aa1b6c2eb821dd8b35a65ecb431f",
  blockNumber: 7007233,
  hash: "0xe05d9cd319824a8cfcb2024557ee14d1ed3bd156d7a823f117588efea5dc9d25",
  transactionHash:
    "0xe05d9cd319824a8cfcb2024557ee14d1ed3bd156d7a823f117588efea5dc9d25",
  from: "0x8096334C0BDC58F7e86ec38bcDE3A43AFA04D477",
  to: "0x5ad1DAb7BfFdB622AF8B88882DDE9EDF1F01F17A",
  logs: [
    {
      address: "0x6C1851b852F05bdc7c0BE1A088532E4999fD94Fa",
      topics: [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x0000000000000000000000005ad1dab7bffdb622af8b88882dde9edf1f01f17a",
        "0x000000000000000000000000f0e4b0933a90d50a99f976e949dd9be7628b51ea",
      ],
      data: "0x0000000000000000000000000000000000000000000000008ac7230489e80000",
    },
    {
      address: "0x5ad1DAb7BfFdB622AF8B88882DDE9EDF1F01F17A",
      topics: [
        "0x8d57f9f57997efb57ed0839bfe4bb920cfb8004fd80cdac63be1acd419d4c28a",
        "0x0000000000000000000000006c1851b852f05bdc7c0be1a088532e4999fd94fa",
        "0x000000000000000000000000f0e4b0933a90d50a99f976e949dd9be7628b51ea",
        "0x0000000000000000000000000000000000000000000000008ac7230489e80000",
      ],
      data: "0xfdf62bb5c4e43c4f26d5685ede8e40e4a16b7cd69f2f1797711b9f5bbf2741c1000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000086137313565623766000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004185cabe8cc0f6a415a30bae1c456d64876b4d064f98379a5c7047dff7654c69bb11fa257ff9572cab7885ef87d35a5b8185738ab94d7c5fb60551508082217ecb1b00000000000000000000000000000000000000000000000000000000000000",
    },
  ],
  input:
    "0xa25d97d20000000000000000000000006c1851b852f05bdc7c0be1a088532e4999fd94fa00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000f0e4b0933a90d50a99f976e949dd9be7628b51ea0000000000000000000000000000000000000000000000008ac7230489e8000000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000086137313565623766000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004185cabe8cc0f6a415a30bae1c456d64876b4d064f98379a5c7047dff7654c69bb11fa257ff9572cab7885ef87d35a5b8185738ab94d7c5fb60551508082217ecb1b00000000000000000000000000000000000000000000000000000000000000",
  value: "0x0",
  nonce: "0x19",
  gas: "0x193af",
  gasUsed: "0x17ff0",
  cumulativeGasUsed: "0x131570d",
  gasPrice: "0xd96fd445",
  gasTipCap: "0xa514c1",
  gasFeeCap: "0x1a9612391",
};
