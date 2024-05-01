# It's just a wallet! ✨

This wallet is a straightforward programmable solution enabled by [Circle's SDK](https://developers.circle.com/circle-mint/docs/circle-sdks). It enables users to create one or more user account type within the Circle developer console. Users can request tokens from Circle's faucet, check their balance, conduct transactions between accounts, and review transaction history.

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
### Core Functionalities: 
- Wallet creation: the application simplifies the process by prompting users to sign in with their Google account, enabling swift onboarding without the need for seed phrases or complex setups. Following sign-in, users are guided through a modal to set up a PIN and recovery questions, ensuring a secure account setup. Once completed, users are seamlessly redirected to the dashboard, where they can explore the various functionalities of the wallet. Additionally, users have the flexibility to choose between creating an EOA or SCA wallet type.
![image](https://github.com/AugustHottie/circle-wallet/assets/96122635/f786fe37-aef1-4620-ae35-4a74350c667d)
![image](https://github.com/AugustHottie/circle-wallet/assets/96122635/1cd1f0a6-82e6-413b-a8dc-77a00eac3e9c)
 
- Wallet transfers: upon selecting their preferred wallet type, users can either request tokens from the faucet, initiating an inbound transfer, or proceed to initialize an outbound transfer from one wallet address to another.
![image](https://github.com/AugustHottie/circle-wallet/assets/96122635/572b5a1b-b47d-4772-951c-c601042d66c8)

- Wallet recovery: if a user forgets their PIN or wishes to update it, they can conveniently reset it via the app's settings page.
![image](https://github.com/AugustHottie/circle-wallet/assets/96122635/607bd34d-035c-4e06-bdd3-9ba7cc73d47b)


## Custom Features

### Contacts

Contacts was a custom feature that I added to the wallet. Contacts serve as a personalized directory within the wallet, allowing users to maintain a list of frequently transacted individuals or entities. Instead of tediously entering recipient details for each transaction, users can simply select contacts from their list, streamlining the transfer process.

It has been added via React Context API and uses local storage to store contacts.
![image](https://github.com/AugustHottie/circle-wallet/assets/96122635/7e9fe646-4dc2-4d95-9274-18e4e3dba686)


### Social login

I added Google OAuth for social login. It allows you to sign in with your Google account and use the wallet. This way users don't have to store user id.
I used the `@react-oauth/google` library for this.

![image](https://github.com/AugustHottie/circle-wallet/assets/96122635/7f62d0b1-6785-4cda-a80c-fe6de60f6730)


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

## Demo 🚀

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
