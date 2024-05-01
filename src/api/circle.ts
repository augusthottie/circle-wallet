import { GetBalancesResponse, Transaction, WalletResponse } from "@circle-fin/user-controlled-wallets/dist/types/clients/user-controlled-wallets";

export async function createTransaction({
    amount,
    destinationAddress,
    walletId,
    userToken,
    encryptionKey,
    tokenId,
    fee
}: {
    amount: string;
    destinationAddress: string;
    walletId: string;
    tokenId: string;
    fee: "LOW" | "MEDIUM" | "HIGH";
    userToken: string;
    encryptionKey: string;
}): Promise<{
    status: number;
    data: {
        challengeId: string;
    };
}> {
    return await fetch("/api/circle/createTransaction", {
        method: "POST",
        body: JSON.stringify({
            amounts: [amount],
            destinationAddress,
            walletId,
            userToken,
            encryptionKey,
            tokenId,
            fee
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (res) => {
        return {
            status: res.status,
            data: (await res.json()).data
        };
    });
}

export async function getWalletTokenBalance({
    walletId,
    userToken,
    encryptionKey
}: {
    walletId: string;
    userToken: string;
    encryptionKey: string;
}): Promise<{
    status: number;
    data: {
        balance: GetBalancesResponse;
    }
}> {
    return await fetch("/api/circle/fetchBalance", {
        method: "POST",
        body: JSON.stringify({
            walletId,
            userToken,
            encryptionKey
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (res) => {
        return {
            status: res.status,
            data: (await res.json()).data
        }
    });
}

export async function listTransactions({
    userToken,
    walletIds,
    encryptionKey
}: {
    userToken: string;
    encryptionKey: string;
    walletIds: string[];
}): Promise<{
    status: number;
    data: {
        transactions: Transaction[];
    };
}> {
    return await fetch("/api/circle/fetchTransactions", {
        method: "POST",
        body: JSON.stringify({
            userToken,
            walletIds,
            encryptionKey
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (res) => {
        return {
            status: res.status,
            data: (await res.json()).data
        };
    });
}

export async function createUserPinWithWallets({
    userId,
}: {
    userId: string;
}): Promise<{
    status: number;
    data: {
        challengeId: string;
        userToken: string;
        encryptionKey: string;
    };
}> {
    return await fetch("/api/circle/userCreate", {
        method: "POST",
        body: JSON.stringify({
            userId,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (res) => {
        return {
            status: res.status,
            data: (await res.json()).data
        };
    });
}

export async function refreshSession({
    userId
}: {
    userId: string;
}): Promise<{
    status: number;
    data: {
        userToken: string;
        encryptionKey: string;
    };
}> {
    return await fetch("/api/circle/refreshSession", {
        method: "POST",
        body: JSON.stringify({
            userId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (res) => {
        return {
            status: res.status,
            data: (await res.json()).data
        };
    });
}

export async function getWallet({
    walletId,
    userToken
}: {
    walletId: string;
    userToken: string;
}): Promise<{
    status: number;
    data: {
        wallet: WalletResponse;
    };
}> {
    return await fetch("/api/circle/getWallet", {
        method: "POST",
        body: JSON.stringify({
            walletId,
            userToken
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (res) => {
        return {
            status: res.status,
            data: (await res.json()).data
        };
    });
}

export async function getWallets({
    userToken
}: {
    userToken: string;
}): Promise<{
    status: number;
    data: {
        wallets: WalletResponse[];
    };
}> {
    return await fetch("/api/circle/getWallets", {
        method: "POST",
        body: JSON.stringify({
            userToken
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (res) => {
        return {
            status: res.status,
            data: (await res.json()).data
        };
    });
}

export async function createWallet({
    type,
    userToken,
    name,
    description
}: {
    type: "SCA" | "EOA";
    userToken: string;
    name: string;
    description: string;
}): Promise<{
    status: number;
    data: {
        challengeId: string;
    };
}> {
    return await fetch("/api/circle/walletCreate", {
        method: "POST",
        body: JSON.stringify({
            type,
            userToken,
            name,
            description
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (res) => {
        return {
            status: res.status,
            data: (await res.json()).data
        };
    });
}

export async function updateUserPin({
    userId
}: {
    userId: string;
}): Promise<{
    status: number;
    data: {
        challengeId: string;
    };
}> {
    return await fetch("/api/circle/changePin", {
        method: "POST",
        body: JSON.stringify({
            userId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (res) => {
        return {
            status: res.status,
            data: (await res.json()).data
        };
    });
}

export async function restorePin({
    userId
}: {
    userId: string;
}): Promise<{
    status: number;
    data: {
        challengeId: string;
    };
}> {
    return await fetch("/api/circle/restorePin", {
        method: "POST",
        body: JSON.stringify({
            userId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async (res) => {
        return {
            status: res.status,
            data: (await res.json()).data
        };
    });
}