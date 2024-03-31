/* ERC20 ABI */
export const erc20Abi = [
    {
      type: 'event',
      name: 'Transfer',
      inputs: [
        {
          indexed: true,
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          name: 'value',
          type: 'uint256',
        },
      ],
    }
  ] as const;