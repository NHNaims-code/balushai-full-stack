import { createConversation, getCustomerConversation, getVendorConversation, sendMessage } from "../../services/chat";
import { error } from "../../utils";


function conversationController() {
    return {
        createCustomerConversation: async(req, res) => {
          console.log("create customer conversation: ", {messages: [], customer_id: req.user?._id, ...req.body})
          const defaultMessage = await sendMessage({text: 'Hi', sender: 'CUSTOMER'})
          const conversation = await createConversation({messages: [defaultMessage._id], customer_id: req.user?._id, ...req.body})
          return res.status(200).json(conversation);
        },

        createVendorConversation: async(req, res) => {
          const conversation = await createConversation({messages: [], vendor_id: req.user?._id, ...req.body})
          return res.status(200).json(conversation);
        },

        getCustomerConversation: async(req, res) => {
          const conversation = await getCustomerConversation(req.user?._id)
          return res.status(200).json(conversation);
        },

        getVendorConversation: async(req, res) => {
          const conversation = await getVendorConversation(req.user?._id)
          return res.status(200).json(conversation);
        }
        
      
    }
}
export { conversationController };