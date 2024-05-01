import type { NextApiRequest, NextApiResponse } from 'next'
import { CircleClient } from '@/server/circle'
import { invariant } from 'ts-invariant'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { type, userToken, name, description }: {
        type: "SCA" | "EOA"
        userToken: string;
        name: string;
        description: string;
    } = req.body

    let createWallet = await CircleClient.createWallet({
        blockchains: ["ETH-SEPOLIA"],
        accountType: type,
        userToken,
        metadata: [
            {
                name,
                refId: description
            }
        ]
    });

    invariant(createWallet.status === 201, `Failed to create wallet: ${createWallet.data}`);
    invariant(createWallet.data, `Failed to create wallet: ${createWallet.data}`);

    return res.status(200).json({
        data: {
            challengeId: createWallet.data.challengeId,
        }
    });
}