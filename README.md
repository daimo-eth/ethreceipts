# Eth Receipts

The goal of Eth Receipts is to show ERC-20 transfers in a clean and extensible way.

Eth Receipts supports multiple chains and multiple block numbers and log indices in the following format:
`https://ethreceipt.org/l/<chainId>/<blockNumber>/<logIndex>`

Example: `https://ethreceipt.org/l/8453/12320223/94` specifies Base chain (8453), a block number (12320223) and a log index (94).

### Adding Address Profile Bubble

Eth Receipts currently supports address profile bubbles for ENS and Daimo accounts, but is built to be extensible. To add a new address profile bubble, you must:

- In `app/utils/profiles/getProfileFunctions.ts`, add a file that exports a function that retrieves the address profile for an address.
  - The function should take an `Address` and a `PublicClient` as parameters and return an `Account` (defined in `app/utils/types.ts`) or `null`.
- In `app/utils/profiles/index.ts`, add the function to the `getProfileFunctions` array.
- In `app/utils/types.ts`, add a new `AccountTypeStr` enum value for the new address profile bubble (e.g. `ENS`, `DAIMO`).

### Build Locally

```
pnpm dev
```
