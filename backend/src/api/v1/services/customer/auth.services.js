
import { generatePasswordHash } from "../../utils";
import { Customer } from "../../mongodb/customer";

export const findCustomerByIDAndTokenUpdate = async (query, data) => {
    try {
        return await Customer.findOneAndUpdate(query, data, { new: true }).lean()
    } catch (err) {
        console.log(err);
    }
}


export const createCustomer = async (data) => {
    try {
        const { name, email, phone, password } = data;

        //password hash using bcrypt
        const hashPassword = await generatePasswordHash(password);

        return await Customer.create({
            name,
            email,
            phone,
            password: hashPassword
        })
    } catch (err) {
        console.log(err);
    }
}

export const findCustomerUsingEmail = async (data) => {
    try {
        return await Customer.findOne(data).lean();
    } catch (err) {
        console.log(err);
    }
}


export const findCustomerUsingID = async (id) => {
    try {
        return await Customer.findById(id).lean();
    } catch (err) {
        console.log(err);
    }
}

export const findCustomerByIDAndUpdate = async (id, data) => {
    try {
        return await Customer.findByIdAndUpdate(id, data, { new: true }).lean();
    } catch (err) {
        console.log(err);
    }
}
