"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_APP_KEY;

export const tokenProvider = async () => {
    const user = await currentUser();

    if(!user) throw new Error("User is not logged in");
    if(!apiKey) throw new Error("No API key");
    if(!apiSecret) throw new Error("No API secret");

    const client = new StreamClient(apiKey, apiSecret);

    // exp is optional (by default the token is valid for an hour)
    const exp = Math.floor(Date.now() / 1000) + 3600;
    const issued = Math.floor(Date.now() / 1000) - 60;

    const token = client.generateUserToken({user_id: user.id, exp, iat: issued});

    return token;
}