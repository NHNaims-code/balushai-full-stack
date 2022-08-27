import { Post } from "../xhr";

export function signIn(path, requestData){
  return Post(path, requestData);
}