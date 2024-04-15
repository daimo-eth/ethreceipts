# Eth Receipts

Today, the only way to show someone you paid them onchain is by linking to a transaction on Etherscan. While Etherscan is an extremely useful developer tool, it is not always the most user-friendly way to show someone you paid them onchain.

The goal of Eth Receipts is to show ERC-20 transfers in a clean and extensible way. No information overload, no noise. Just a simple receipt.

## Usage

To see a receipt of an ERC-20 transfer, specify the chain ID, block number, and log index in the following format:
`https://ethreceipt.org/l/<chainId>/<blockNumber>/<logIndex>`

Example: `https://ethreceipt.org/l/8453/12320223/94` specifies Base chain (8453), a block number (12320223) and a log index (94).

Today, Eth Receipts supports Base (8453) and Ethereum (1).

## Contributing

We built Eth Receipts to be easy to extend and contribute to. Currently, the project supports address bubbles for Daimo and ENS accounts but can easily be extended to other address profiles.

<details open>
<summary>Add a new address profile bubble</summary>
<br>
To add a new address profile bubble, you must:

- In `app/utils/profiles/getProfileFunctions.ts`, add a file that exports a function that retrieves the address profile for an address.
  - The function should take an `Address` and a `PublicClient` as parameters and return an `Account` (defined in `app/utils/types.ts`) or `null`.
- In `app/utils/profiles/index.ts`, add the function to the `getProfileFunctions` array.
- In `app/utils/types.ts`, add a new `AccountTypeStr` enum value for the new address profile bubble (e.g. `ENS`, `DAIMO`).
- (optional) In `public/profileIcons/profileIcons.tsx`, add a new component for the profile logo and add it to the `AccountIcon` function.
- (optional) In `apps/utils/profiles/getProfileLink.ts`, add a function that returns a link for an account name given an account type.
</details>

## Development

Eth Receipt is a project supported and built by [Daimo](https://daimo.com).

<details open>
<summary>Dev quickstart</summary>
<br>
```
pnpm install
pnpm run dev
```
</details>
