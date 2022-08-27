import { error } from "../../utils";
import validator from "validator";
import { addressValidation } from "../../validations";
import { createAddress, deleteAddress, getAllAddress, updateAddress, updateAddressAndCustomer } from "../../services/customer";

function addressController() {
    return {
        // create an address
        createAddress: async (req, res) => {

            const validation = addressValidation(req.body);
            //console.log(validation.error)
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            const { address } = req.body;

            const savedAddress = await createAddress({ _id: req.user?._id }, {
                ...req.body,
                address: validator.escape(address)
            })

            return res.status(201).json(savedAddress);
        },

        // Find single address by ID 
        getSingleAddress: async (req, res) => {
            const address = await getSingleAddress({ _id: req.params?.id });
            if (!address) return error().resourceError(res, 'Sorry! This address doest not exists or something wrong', 422);
            return res.status(200).json(address)
        },

        // Delete address by ID 
        deleteAddress: async (req, res) => {
            const deletedAddress = await deleteAddress({ _id: req.params?.id }, req.user?._id);
            if (!deletedAddress) return error().resourceError(res, 'Sorry! This address doest not exists or something wrong', 422);
            return res.status(200).json(deletedAddress);
        },

        // Get All Address
        getAllAddresses: async (req, res) => {
            // Get all address form db
            const addresses = await getAllAddress({ _id: req.user?._id })
            return res.status(200).send(addresses);
        },

        // Update Address by ID
        updateAddress: async (req, res) => {

            const validation = addressValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            const { address } = req.body;

            const updatedAddress = await updateAddress({ _id: req.params?._id }, {
                ...req.body,
                address: validator.escape(address)
            })

            if (!updatedAddress) return error().resourceError(res, 'Sorry! This Address doest not exists or something wrong', 422);
            return res.status(200).send(updatedAddress);
        },

       /*  // Set Billing Address by ID
        setDefaultBillingAddress: async (req, res) => {

            // Update address 
            const updatedAddress = await updateAddressAndCustomer({ _id: req.params?.id }, {
                default_billing_address: true
            }, req.user?._id);

            if (!updatedAddress) return error().resourceError(res, 'Sorry! This Address doest not exists or something wrong', 422);
            return res.status(200).send(updatedAddress);
        },

        // Set Billing Address by ID
        unsetDefaultBillingAddress: async (req, res) => {
            // Update address 
            const updatedAddress = await updateAddress({ _id: req.params?.id }, {
                default_billing_address: false
            });

            if (!updatedAddress) return error().resourceError(res, 'Sorry! This Address doest not exists or something wrong', 422);
            return res.status(200).send(updatedAddress);
        },
 */
        // Set Shipping Address by ID
        setDefaultShippingAddress: async (req, res) => {
            // Update address 
            const updatedAddress = await updateAddressAndCustomer({ _id: req.params?.id }, {
                default_shipping_address: true
            }, req.user?._id);

            if (!updatedAddress) return error().resourceError(res, 'Sorry! This category doest not exists or something wrong', 422);
            return res.status(200).send(updatedAddress);
        },

        // Un Set Shipping Address by ID
        unsetDefaultShippingAddress: async (req, res) => {
            // Update address 
            const updatedAddress = await updateAddress({ _id: req.params?.id }, {
                default_shipping_address: false
            });

            if (!updatedAddress) return error().resourceError(res, 'Sorry! This category doest not exists or something wrong', 422);
            return res.status(200).send(updatedAddress);
        },
    }
}
export { addressController };