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

    let createSession = await CircleClient.createUserToken({
        userId
    });

    invariant(createSession.status === 200, `Failed to create user token: ${createSession.data}`);
    invariant(createSession.data, `Failed to create user token: ${createSession.data}`);

    return res.status(200).json({
        data: {
            userToken: createSession.data.userToken,
            encryptionKey: createSession.data.encryptionKey,
        }
    });
}