import { Message } from "../../mongodb/chat";

export const sendMessage = async (data) => {
  try {
      return await Message.create(data)
  } catch (err) {
      console.log(err);
  }
}

export const getCustomerMessage = async (id) => {
  try {
      return await Message.find({customer_id:id}).select('vendor_id -_id').populate('vendor_id')
  } catch (err) {
      console.log(err);
  }
}

export const getVendorMessage = async (id) => {
  try {
      return await Message.find({vendor_id:id})
  } catch (err) {
      console.log(err);
  }
}

export const getVendorAndCustomerMessage = async (customerId, vendorId) => {
  try {
      return await Message.find({vendor_id:vendorId, customer_id:customerId})
  } catch (err) {
      console.log(err);
  }
}
export const deletemessageById = async (messageId) => {
  try {
      return await Message.findOneAndUpdate({_id:messageId}, {$set: {isDeleted:true}})
  } catch (err) {
      console.log(err);
  }
}