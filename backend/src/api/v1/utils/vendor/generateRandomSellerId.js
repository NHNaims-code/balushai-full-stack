import crypto from 'crypto';
export default async () => {
    return await crypto.randomBytes(5).toString("hex").toUpperCase()
}