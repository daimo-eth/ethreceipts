import { Address } from 'viem';
import { AccountTypeStr, Account } from '../types';

export enum AddrLabel {
  Faucet = 'team daimo',
  PaymentLink = 'payment link',
  RequestLink = 'request link',
  Paymaster = 'fee',
  Coinbase = 'coinbase',
  Relay = 'relay.link',
  LiFi = 'li.fi bridge',
  UniswapETHPool = 'swapped ETH',
}

export const specialAddrLabels: { [_: Address]: AddrLabel } = {
  // All historical faucet addresses
  '0x2A6d311394184EeB6Df8FBBF58626B085374Ffe7': AddrLabel.Faucet,
  // All historical notes ("payment link") contract addresses
  '0x37Ac8550dA1E8d227266966A0b4925dfae648f7f': AddrLabel.PaymentLink,
  '0x450E09fc6C2a9bC4230D4e6f3d7131CCa48b48Ce': AddrLabel.PaymentLink,
  '0x1eec7E083C1a10C16470bEAc7839364853c7B81f': AddrLabel.PaymentLink,
  '0x831967F433D9425Aa34D6A3dAC01a428d839De0f': AddrLabel.PaymentLink,
  '0x4AdcA7cB84497c9c4c308063D2f219C7b6041183': AddrLabel.PaymentLink,
  '0x594bc666500fAeD35DC741F45a35C571399560d8': AddrLabel.PaymentLink,
  '0xfBdb4f1172AaDADdFe4233550e9cD5E4aA1Dae00': AddrLabel.PaymentLink,
  '0xf823d42B543ec9785f973E9Aa3187E42248F4874': AddrLabel.PaymentLink,
  // All historical paymaster addresses
  '0x13f490FafBb206440F25760A10C21A6220017fFa': AddrLabel.Paymaster,
  '0x939263eAFE57038a072cb4edD6B25dd81A8A6c56': AddrLabel.Paymaster,
  '0x0000000000dd6Dd248Ab5487218e1C2D7fbB29c9': AddrLabel.Paymaster,
  // Known Coinbase Pay addresses on Base
  '0x20FE51A9229EEf2cF8Ad9E89d91CAb9312cF3b7A': AddrLabel.Coinbase,
  '0x6dcBCe46a8B494c885D0e7b6817d2b519dF64467': AddrLabel.Coinbase,
  '0x1985EA6E9c68E1C272d8209f3B478AC2Fdb25c87': AddrLabel.Coinbase,
  // Known relay.link address on Base
  '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF': AddrLabel.Relay,
  // Known li.fi addresses on Base
  '0x4DaC9d1769b9b304cb04741DCDEb2FC14aBdF110': AddrLabel.LiFi,
  // Known Uniswap ETH pools on Base
  '0xd0b53D9277642d899DF5C87A3966A349A798F224': AddrLabel.UniswapETHPool,
  '0x6c561B446416E1A00E8E93E221854d6eA4171372': AddrLabel.UniswapETHPool,
};

/**
 * Retrieve label for special addresses
 *
 * @param {string} accountAddress - The account address.
 * @returns {Account} - The profile for the special account address.
 */
export async function tryGetSpecialAddrLabels(accountAddress: Address): Promise<Account | null> {
  const label = specialAddrLabels[accountAddress];
  if (!label) return null;

  const ensProfile: Account = {
    type: AccountTypeStr.SPECIAL_ADDRESS,
    name: label,
    avatar: null,
    url: null,
  };
  return ensProfile;
}
