import crypto from 'crypto';
export default async () => {
    return await crypto.randomBytes(4).toString("hex")
}