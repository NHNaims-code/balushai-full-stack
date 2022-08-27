import { messageRoutes } from "./message.routes";
import { conversationRoutes } from './conversation.routes'

function ChatRoutes(app) {
  messageRoutes(app)
  conversationRoutes(app)
}
export { ChatRoutes };