import { Vendor } from "../../mongodb/vendor";

export const sendEmailToAllCustomer = async ({ body, subject }) => {
    try {
        const emails = await Vendor.find({}).select('seller_account.email');
        emails?.forEach(element => {
            const { seller_account: { email } } = element;
            console.log(email)
        });
        return;
    } catch (err) {
        console.log(err);
    }
}

export const sendEmail = async ({ email, body, subject }) => {
    try {
        console.log(email)
        return;
    } catch (err) {
        console.log(err);
    }
}