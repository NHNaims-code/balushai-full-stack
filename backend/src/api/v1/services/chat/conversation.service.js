import { Conversation } from "../../mongodb/chat";

export const createConversation = async (data) => {
  try {
      const existConversation = await Conversation.findOne({customer_id: data.customer_id, vendor_id: data.vendor_id})
      if(existConversation){
        console.log("conversation allready exist", existConversation)
        return existConversation
      }else{
        return await Conversation.create(data)
      }
  } catch (err) {
      console.log(err);
  }
}

export const getCustomerConversation = async (id) => {
  try {
      return await Conversation.find({customer_id: id})
      // .select('vendor_id')
      .populate({
        path: 'vendor_id',
        model: 'Vendor',
        select: 'seller_account'
      })
      .populate({
        path: 'messages',
        model: 'Message',
        select: '-_v'
      })
  } catch (err) {
      console.log(err);
  }
}

export const getVendorConversation = async (id) => {
  try {
      return await Conversation.find({vendor_id: id}).select('customer_id').populate('customer_id')
  } catch (err) {
      console.log(err);
  }
}

export const updateConversation = async (id, data) => {
  try {
      const { messages } = await Conversation.findOne({_id:id})
      messages?.push(data)
      return await Conversation.findOneAndUpdate({ _id:id }, { messages })
  } catch (err) {
      console.log(err);
  }
}