import { conversationController } from "../../controllers/chat/conversation.controller";
import { customerAuthentication } from "../../middlewares/customer";
import { vendorAuthentication } from "../../middlewares/vendor/auth.middleware";
import { tryCatchHandle } from "../../utils";

function conversationRoutes(app) {
  app.post('/conversation/create-customer-conversation', customerAuthentication, tryCatchHandle(conversationController().createCustomerConversation));
  app.post('/conversation/create-vendor-conversation', vendorAuthentication, tryCatchHandle(conversationController().createVendorConversation));
  app.get('/conversation/get-customer-conversation', customerAuthentication, tryCatchHandle(conversationController().getCustomerConversation));
  app.get('/conversation/get-vendor-conversation', vendorAuthentication, tryCatchHandle(conversationController().getVendorConversation));
  // app.post('/chat/send-vendor-message',vendorAuthentication, tryCatchHandle(messageController().sendVendorMessage));
  // app.get('/customer/get-messages',customerAuthentication, tryCatchHandle(messageController().getCustomerMessage));
  // app.get('/vendor/get-messages',vendorAuthentication, tryCatchHandle(messageController().getVendorMessage));
  // app.get('/customer/delete-address/:id',customerAuthentication, tryCatchHandle(messageController().getVendorMessage));
}
export { conversationRoutes };