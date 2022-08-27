import { Post, Get , Update} from "../xhr";

export function sendMessage(data) {
    return Post('chat/send-message', data);
}



