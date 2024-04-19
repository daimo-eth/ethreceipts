import type { Integration, Table } from '@indexsupply/shovel-config';

const table: Table = {
  name: 'usdc-transfers',
  columns: [
    { name: 'chain_id', type: 'numeric' },
    { name: 'block_num', type: 'numeric' },
    { name: 'block_hash', type: 'bytea' },
    { name: 'tx_idx', type: 'numeric' },
    { name: 'tx_hash', type: 'bytea' },
    { name: 'log_addr', type: 'bytea' },
    { name: 'f', type: 'bytea' },
    { name: 't', type: 'bytea' },
    { name: 'v', type: 'numeric' },
  ],
};

// All ERC-20 transfers.
export const transfersIntegration: Integration = {
  name: 'usdc-transfers',
  enabled: true,
  sources: [{ name: '$CHAIN_NAME', start: '$CHAIN_START_BLOCK' }],
  table,
  block: [
    { name: 'chain_id', column: 'chain_id' },
    { name: 'block_num', column: 'block_num' },
    { name: 'block_hash', column: 'block_hash' },
    { name: 'tx_idx', column: 'tx_idx' },
    { name: 'tx_hash', column: 'tx_hash' },
    // USDC transfers.
    // {
    //   name: 'log_addr',
    //   column: 'log_addr',
    //   filter_op: 'contains',
    //   filter_arg: [getChainConfig('base').tokenAddress, getChainConfig('baseSepolia').tokenAddress],
    // },
  ],
  event: {
    name: 'Transfer',
    type: 'event',
    anonymous: false,
    inputs: [
      { indexed: true, name: 'from', type: 'address', column: 'f' },
      { indexed: true, name: 'to', type: 'address', column: 't' },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
        column: 'v',
      },
    ],
  },
};
