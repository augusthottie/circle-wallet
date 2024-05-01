import type { NextApiRequest, NextApiResponse } from 'next'
import { CircleClient } from '@/server/circle'
import { invariant } from 'ts-invariant'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { userId }: {
        userId: string;
    } = req.body

    let updateUserPin = await CircleClient.updateUserPin({
        userId
    });

    invariant(updateUserPin.status === 201, `Failed to update user pin: ${updateUserPin.data}`);
    invariant(updateUserPin.data, `Failed to update user pin: ${updateUserPin.data}`);

    return res.status(200).json({
        data: {
            challengeId: updateUserPin.data.challengeId,
        }
    });
}