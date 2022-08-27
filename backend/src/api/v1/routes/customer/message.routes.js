import { messageController } from "../../controllers/common/message.controller";
import { customerAuthentication } from "../../middlewares/customer";
import { tryCatchHandle } from "../../utils";

function messageRoutes(app) {
  app.post('/chat/send-customer-message',customerAuthentication, tryCatchHandle(messageController().sendCustomerMessage));
  app.get('/customer/get-messages',customerAuthentication, tryCatchHandle(messageController().getCustomerMessage));
}
export { messageRoutes };