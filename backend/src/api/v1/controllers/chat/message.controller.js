
import { createConversation, deletemessageById, getCustomerMessage, getVendorMessage, sendMessage, updateConversation } from "../../services/chat";
import { error } from "../../utils";


function messageController() {
    return {
        sendMessage: async (req, res) => {
            const message = await sendMessage(req?.body)
            if(req?.body?.conversation_id){
                return await updateConversation(conversation_id, message._id)
            }
        },
        
        // getCustomerMessage: async (req, res) => {
        //     console.log("message here")
        //     const message = await getCustomerMessage(req.user?._id);
        //     if (!message) return error().resourceError(res, 'Message Not Found', 404);
        //     return res.status(200).json(message);
        // },
        // getVendorMessage: async (req, res) => {
        //     console.log("message here")
        //     const message = await getVendorMessage(req.user?._id);
        //     if (!message) return error().resourceError(res, 'message Not Found', 404);
        //     return res.status(200).json(message);
        // },
        // deletemessage: async (req, res) => {
        //     const message = await deletemessageById(req.params?.id);
        //     if (!message) return error().resourceError(res, 'Deleted Failed', 404);
        //     return res.status(200).json(message);
        // },
        
    }
}
export { messageController };