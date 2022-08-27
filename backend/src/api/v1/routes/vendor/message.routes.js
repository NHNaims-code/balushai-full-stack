import { messageController } from "../../controllers/common/message.controller";
import { vendorAuthentication } from "../../middlewares/vendor/auth.middleware";
import { tryCatchHandle } from "../../utils";

function messageRoutes(app) {
  app.post('/chat/send-vendor-message',vendorAuthentication, tryCatchHandle(messageController().sendVendorMessage));
  app.get('/vendor/get-messages',vendorAuthentication, tryCatchHandle(messageController().getVendorMessage));
}
export { messageRoutes };