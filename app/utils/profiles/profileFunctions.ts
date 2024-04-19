import { tryGetEnsProfile } from '@/app/utils/profiles/getEns';
import { tryGetDaimoProfile } from '@/app/utils/profiles/getDaimo';

const getProfileFunctions = (chainId: number) => {
  switch (chainId) {
    case 1:
      return [tryGetEnsProfile];
    case 8453:
      return [tryGetDaimoProfile];
    default:
      return [tryGetEnsProfile];
  }
};

export { getProfileFunctions };
