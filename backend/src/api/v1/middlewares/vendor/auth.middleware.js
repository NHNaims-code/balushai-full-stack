import jwt from 'jsonwebtoken'
import { config } from '../../../../config'
import { findVendorUsingIdAndToken } from '../../services/vendor';
import { error } from '../../utils';

export const vendorAuthentication = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"] || req.header('Authorization');

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const verify_token = jwt.verify(token, config.jwt.key);
        const vendor = await findVendorUsingIdAndToken({ $and: [{ _id: verify_token._id }, { token: verify_token?.verifyToken }] })
        if (!vendor) return res.status(401).send("Invalid Token");
        if (vendor?.is_active === false) return error().resourceError(res,'Your account has not been activated. Please contact Admin or Administrator', 400)
        req.user = verify_token;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};