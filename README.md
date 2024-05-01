# It's just a wallet!

This is a simple circle wallet that allows you to create a wallet, deposit money, check your balance, and transfer money to another wallet via Circle SDK.

## Technologies

- Next.js
- Tailwind CSS
- Circle SDK
- TypeScript

## Libraries Used

- @circle-fin/user-controlled-wallets (Circle Server SDK)
- @circle-fin/w3s-pw-web-sdk (Circle Web Client SDK)
- @headlessui/react (Headless UI)
- @interest-protocol/ui-kit (Interest Protocol UI Kit)
- @noble/hashes (SHA256 hashing)
- @phosphor-icons/react (for icons)
- @react-oauth/google (Google OAuth)
- jwt-decode (JWT decoding for Google OAuth)
- react-toastify (Toast notifications)
- ts-invariant (TypeScript invariant)
- usehooks-ts (Custom hooks)
- uuid (UUID generation)

## Features

- Wallet creation
- Wallet transfers
- Wallet recovery

## Custom Features

### Contacts

Contacts was a custom feature that I added to the wallet. It allows you to add contacts to your wallet and transfer money to them easily.
It has been added via React Context API and uses local storage to store contacts.

### Social login

I added Google OAuth for social login. It allows you to sign in with your Google account and use the wallet. This way users don't have to store user id.
I used the `@react-oauth/google` library for this.

## Folder Structure

- api: API fetch functions
- components: Reusable components
- constants: Constants
- context: Contexts for global state management
- hooks: Custom hooks
- pages: Next.js pages
- pages/api: API routes
- providers: Providers for global state management
- server: Circle SDK server
- styles: Global styles
- types: Typescript types
- utils: Utility functions

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CIRCLE_API_KEY`

## Demo

You can view the demo [here](https://its-just-a-wallet.vercel.app/)

## Installation

```bash
pnpm install
```

## Usage

```bash
pnpm dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
