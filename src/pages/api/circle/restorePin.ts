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

    let restoreUserPin = await CircleClient.restoreUserPin({
        userId
    });

    invariant(restoreUserPin.status === 201, `Failed to restore user pin: ${restoreUserPin.data}`);
    invariant(restoreUserPin.data, `Failed to restore user pin: ${restoreUserPin.data}`);

    return res.status(200).json({
        data: {
            challengeId: restoreUserPin.data.challengeId,
        }
    });
}