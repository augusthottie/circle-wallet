import type { NextApiRequest, NextApiResponse } from 'next'
import { CircleClient } from '@/server/circle'
import { invariant } from 'ts-invariant'
import { Transaction } from '@circle-fin/user-controlled-wallets/dist/types/clients/user-controlled-wallets';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { userToken, encryptionKey, walletIds }: {
        userId: string;
        walletIds: string[]
        userToken: string;
        encryptionKey: string;
    } = req.body;

    let transactions = await CircleClient.listTransactions({
        userToken: userToken,
        walletIds
    });

    invariant(transactions.status === 200, `Failed to get transactions: ${transactions.data}`);
    invariant(transactions.data, `Failed to get transactions: ${transactions.data}`);

    return res.status(200).json({
        data: {
            transactions: transactions.data.transactions ? transactions.data.transactions : [],
            userToken: userToken,
            encryptionKey: encryptionKey
        }
    });
}