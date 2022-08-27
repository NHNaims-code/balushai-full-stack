import { Post } from "adapters/xhr";

export function SendSms(path, data) {
  return Post(path, data);
}