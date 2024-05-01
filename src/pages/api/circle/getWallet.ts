import type { NextApiRequest, NextApiResponse } from 'next'
import { CircleClient } from '@/server/circle'
import { invariant } from 'ts-invariant'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { walletId, userToken }: {
        userToken: string;
        walletId: string;
    } = req.body;

    let wallet = await CircleClient.getWallet({
        userToken: userToken,
        id: walletId
    });

    invariant(wallet.status === 200, `Failed to get wallet: ${wallet.data}`);
    invariant(wallet.data, `Failed to get wallet: ${wallet.data}`);
    invariant(wallet.data.wallet, `Failed to get wallet: ${wallet.data}`);

    return res.status(200).json({
        data: {
            wallet: wallet.data.wallet
        }
    });
}