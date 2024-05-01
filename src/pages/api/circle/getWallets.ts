import type { NextApiRequest, NextApiResponse } from 'next'
import { CircleClient } from '@/server/circle'
import { invariant } from 'ts-invariant'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { userToken }: {
        userToken: string;
    } = req.body;

    let wallets = await CircleClient.listWallets({
        userToken: userToken
    });

    invariant(wallets.status === 200, `Failed to get wallets: ${wallets.data}`);
    invariant(wallets.data, `Failed to get wallets: ${wallets.data}`);
    invariant(wallets.data.wallets, `User has no wallets`);

    return res.status(200).json({
        data: {
            wallets: wallets.data.wallets
        }
    });
}