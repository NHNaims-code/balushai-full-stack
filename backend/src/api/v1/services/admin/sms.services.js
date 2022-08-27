import { Vendor } from "../../mongodb/vendor";

export const sendSmsToAllCustomer = async ({ body }) => {
    try {
        const phones = await Vendor.find({}).select('seller_account.phone');
        phones?.forEach(element => {
            const { seller_account: { phone } } = element;
            console.log(phone)
        });
        return;
    } catch (err) {
        console.log(err);
    }
}

export const sendSms = async ({ phone, body }) => {
    try {
        console.log(phone)
        return;
    } catch (err) {
        console.log(err);
    }
}