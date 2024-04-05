import { tryGetEnsProfile } from '@/app/utils/profiles/getEns';
import { tryGetDaimoProfile } from '@/app/utils/profiles/getDaimo';
import { tryGetUnknownProfile } from '@/app/utils/profiles/getUnknown';

export const getProfileFunctions = [tryGetEnsProfile, tryGetDaimoProfile, tryGetUnknownProfile];
