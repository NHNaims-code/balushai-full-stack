
import { deleteMessageById, getCustomerMessage, getVendorMessage, sendMessage } from "../../services/common";
import { error } from "../../utils";


function messageController() {
    return {
        sendVendorMessage: async (req, res) => {
            const vender_id = req.user?._id
            const message = await sendMessage({
              vender_id, ...req.body
            })
            return res.status(200).json(message) 
        },
        sendCustomerMessage: async (req, res) => {
            const customer_id = req.user?._id
            const message = await sendMessage({
              customer_id, ...req.body
            })
            return res.status(200).json(message) 
        },
        getCustomerMessage: async (req, res) => {
            console.log("message here")
            const message = await getCustomerMessage(req.user?._id);
            if (!message) return error().resourceError(res, 'Message Not Found', 404);
            return res.status(200).json(message);
        },
        getVendorMessage: async (req, res) => {
            console.log("message here")
            const message = await getVendorMessage(req.user?._id);
            if (!message) return error().resourceError(res, 'message Not Found', 404);
            return res.status(200).json(message);
        },
        deleteMessage: async (req, res) => {
            const message = await deleteMessageById(req.params?.id);
            if (!message) return error().resourceError(res, 'Deleted Failed', 404);
            return res.status(200).json(message);
        },
        
    }
}
export { messageController };