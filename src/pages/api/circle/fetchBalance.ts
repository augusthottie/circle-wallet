import type { NextApiRequest, NextApiResponse } from 'next'
import { CircleClient } from '@/server/circle'
import { invariant } from 'ts-invariant'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { userToken, encryptionKey, walletId }: {
        userId: string;
        walletId: string;
        userToken: string;
        encryptionKey: string;
    } = req.body;

    let balance = await CircleClient.getWalletTokenBalance({
        walletId: walletId,
        userToken: userToken
    });

    invariant(balance.status === 200, `Failed to get wallet token balance: ${balance.data}`);
    invariant(balance.data, `Failed to get wallet token balance: ${balance.data}`);

    return res.status(200).json({
        data: {
            balance: balance.data,
            userToken: userToken,
            encryptionKey: encryptionKey
        }
    });
}