import { DB } from '@/src/db/db';

const env = loadEnv();

export function getEnvVars() {
  return env;
}

function loadEnv() {
  return {
    DAIMO_API_URL_WITH_CHAIN: loadReq('DAIMO_API_URL_WITH_CHAIN'),
    ALCHEMY_API_KEY: loadReq('ALCHEMY_API_KEY'),
    ETH_RECEIPTS_DOMAIN: loadReq('ETH_RECEIPTS_DOMAIN'),
    SHOVEL_DB_URL: loadOptional('SHOVEL_DB_URL'),
  };
}

function loadOptional(key: string) {
  return process.env[key] || '';
}

function loadReq(key: string) {
  const val = loadOptional(key);
  if (val === '') {
    throw new Error(`Missing env var ${key}`);
  }
  return val;
}
