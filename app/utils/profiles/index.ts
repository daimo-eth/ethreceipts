import { tryGetEnsProfile } from '@/app/utils/profiles/getEns';
import { tryGetDaimoProfile } from '@/app/utils/profiles/getDaimo';

export const getProfileFunctions = [tryGetEnsProfile, tryGetDaimoProfile];
