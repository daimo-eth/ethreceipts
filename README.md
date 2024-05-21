<img width="966" alt="image" src="https://github.com/daimo-eth/ethreceipts/assets/169280/0c637eeb-d81b-4c59-9166-7a6a8d890852">

**Ethreceipts shows Ethereum events, such as ERC-20 transfers, in a clean and friendly way.**

Today, the way to show someone you paid them onchain is by linking to a transaction on Etherscan. While Etherscan is a useful developer tool, it's too cluttered for wider use.

Our goal is simplicity. No information overload, no noise. Just a receipt.
 
## Usage

To see a receipt of an ERC-20 transfer, specify the chain ID, block number, and log index in the following format:
`https://ethreceipt.org/l/<chainId>/<blockNumber>/<logIndex>`

**Examples**: https://ethreceipt.org/l/8453/12320223/94 specifies Base chain (8453), block #12320223 and log index 94. [https://www.ethreceipt.org/l/1/14648578/431](https://www.ethreceipt.org/l/1/14648578/431) specifies Ethereum L1 (1), block #14648578 and a log index 431.


## Contributing

**We built ethreceipts to be easy to extend and contribute to.** Here are our general guidelines.

**File an issue first.** Proposal discussed in an issue, PR to follow. **Keep it simple.** We already have lots of maximalist block explorers geared toward Ethereum developers. Ethreceipts is minimalist. **We welcome all kinds of contributions. Here are the two main ones:**

- **Rich address information.** A bare `0x...` address is not very informative. We show a rich display when available. Today, that's addresses with a reverse ENS lookup, Daimo addresses, and Farcaster connected addresses. Help us add more.
- **Better transfer display.** Today, we have a great display for standalone ERC-20 Transfer events. But what about a transfer that settles a Bountycaster bounty? A transfer that's one leg of a Uniswap swap? An ETH transfer? (That last one is deceptively hard, since ETH transfers do not produce any logs.) Help us add all of this and more.

In the future, we may add direct support for other kinds of logs (beyond ERC-20 Transfer) too.

<details open>
<summary><strong>Add a new address profile bubble</strong></summary>
<br>
To add a new address profile bubble, you must:

- In `app/utils/profiles`, add a file that exports a function that retrieves the address profile for an address. The function should take an `Address` (at minimum) and return an `Account` (defined in `app/utils/types.ts`) or `null`.
- In `app/utils/profiles/profileFunctions.ts`, add the function to the `getProfileFunctions` array (within the appropriate chain).
- In `app/utils/types.ts`, add a new `AccountTypeStr` enum value for the new address profile bubble (e.g. `ENS`, `DAIMO`).
- (optional) In `public/profileIcons/profileIcons.tsx`, add a new component for the profile logo and add it to the `AccountIcon` function.
- (optional) In `apps/utils/profiles/getProfileLink.ts`, add a function that returns a link for an account name given an account type.
</details>

## Development

Quick start:

```sh
pnpm install
pnpm run dev
```

