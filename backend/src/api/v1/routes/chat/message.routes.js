import { messageController } from "../../controllers/chat/message.controller";
import { customerAuthentication } from "../../middlewares/customer";
import { vendorAuthentication } from "../../middlewares/vendor/auth.middleware";
import { tryCatchHandle } from "../../utils";

function messageRoutes(app) {
  app.post('/chat/send-message', tryCatchHandle(messageController().sendMessage));
  // app.post('/chat/send-vendor-message',vendorAuthentication, tryCatchHandle(messageController().sendVendorMessage));
  // app.get('/customer/get-messages',customerAuthentication, tryCatchHandle(messageController().getCustomerMessage));
  // app.get('/vendor/get-messages',vendorAuthentication, tryCatchHandle(messageController().getVendorMessage));
  // app.get('/customer/delete-address/:id',customerAuthentication, tryCatchHandle(messageController().getVendorMessage));
}
export { messageRoutes };