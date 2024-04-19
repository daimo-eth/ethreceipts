import { trpc } from '../trpc';

/** Search for Daimo account by prefix if exists */
// TODO: update types when daimo-api added
export async function searchDaimoAccount(prefix: string): Promise<any[] | undefined> {
  try {
    // @ts-ignore
    const profileMatches = await trpc.search.query({ prefix: prefix });
    return profileMatches;
  } catch (e) {
    console.log(`Error fetching Daimo account search for ${prefix}`);
    return undefined;
  }
}
