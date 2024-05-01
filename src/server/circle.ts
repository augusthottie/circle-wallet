import { CIRCLE_API_KEY } from "@/constants/circle";
import { initiateUserControlledWalletsClient } from "@circle-fin/user-controlled-wallets"

export const CircleClient = initiateUserControlledWalletsClient({
    apiKey: CIRCLE_API_KEY
});