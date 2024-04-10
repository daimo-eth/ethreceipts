import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { chainConfig } from './env';

const apiUrl = process.env.DAIMO_API_URL || 'http://localhost:3000';
export const apiUrlWithChain = `${apiUrl}/chain/${chainConfig.chainL2.id}`;

// TODO: replace type with AppRouter from @daimo/api when it's available.
export const trpc = createTRPCProxyClient<any>({
  links: [httpBatchLink({ url: apiUrlWithChain })],
});
