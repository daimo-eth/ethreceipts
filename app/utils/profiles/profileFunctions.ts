import { tryGetEnsProfile } from '@/app/utils/profiles/getEns';
import { tryGetDaimoProfile } from '@/app/utils/profiles/getDaimo';
import { tryGetUnknownProfile } from '@/app/utils/profiles/getUnknown';

const getProfileFunctions = [tryGetEnsProfile, tryGetDaimoProfile]; // Add new address profile functions here.
getProfileFunctions.push(tryGetUnknownProfile);

export { getProfileFunctions };
