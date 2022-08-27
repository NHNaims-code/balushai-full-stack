import jwt from 'jsonwebtoken'
import { config } from '../../../../config'
import { findAdminById } from '../../services/admin';
import bcrypt from 'bcrypt';

export const adminAuthentication = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"] || req.header('Authorization');

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const verify_token = jwt.verify(token, config?.jwt?.key);
        const { _id, verifyToken } = verify_token;
        const admin = await findAdminById(_id);
        const tokenMatch = await bcrypt.compare(admin?.token, verifyToken);
        if (!tokenMatch) res.status(401).send("Invalid Token. Please Login Again");
        req.admin = verify_token;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};