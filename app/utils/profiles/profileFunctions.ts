import { tryGetEnsProfile } from '@/app/utils/profiles/getEns';
import { tryGetDaimoProfile } from '@/app/utils/profiles/getDaimo';
import { tryGetFarcasterProfile } from './getFarcaster';
import { tryGetSpecialAddrLabels } from './getSpecialAddresses';

const getProfileFunctions = (chainId: number) => {
  switch (chainId) {
    case 1:
      return [tryGetEnsProfile, tryGetFarcasterProfile];
    case 8453:
      return [tryGetDaimoProfile, tryGetEnsProfile, tryGetSpecialAddrLabels];
    default:
      return [];
  }
};

export { getProfileFunctions };
