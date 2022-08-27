import jwt from 'jsonwebtoken'
import { config } from '../../../../config'
import { findVendorUsingIdAndToken } from '../../services/vendor';

export const vendorAuthenticationWithoutActive = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"] || req.header('Authorization');

    if (!token) {
        return res.status(403).send("A token is required for Authentication");
    }
    try {
        const verify_token = jwt.verify(token, config.jwt.key);
        const vendor = await findVendorUsingIdAndToken({ $and: [{ _id: verify_token._id }, { token: verify_token?.verifyToken }] })
        if (!vendor) return res.status(401).send("Invalid Token");
        req.user = verify_token;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};