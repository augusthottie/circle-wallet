import type { NextApiRequest, NextApiResponse } from 'next'
import { CircleClient } from '@/server/circle'
import { invariant } from 'ts-invariant'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { userToken, encryptionKey, walletId, amounts, destinationAddress, tokenId, fee }: {
        userId: string;
        walletId: string;
        amounts: string[];
        destinationAddress: string;
        tokenId: string;
        fee: "LOW" | "MEDIUM" | "HIGH";
        userToken: string;
        encryptionKey: string;
    } = req.body;

    let transaction = await CircleClient.createTransaction({
        amounts,
        destinationAddress,
        walletId,
        userToken: userToken,
        tokenId,
        fee: {
            type: "level",
            config: {
                feeLevel: fee
            }
        },
    });

    invariant(transaction.status === 201, `Failed to create transaction: ${transaction.data}`);
    invariant(transaction.data, `Failed to create transaction: ${transaction.data}`);

    return res.status(200).json({
        data: {
            challengeId: transaction.data.challengeId,
            userToken: userToken,
            encryptionKey: encryptionKey
        }
    });
}