import { Post } from "../xhr";

export function signUp(path, requestData){
  return Post(path, requestData);
}

export function sendOtp(requestData){
  return Post('send-otp', requestData);
}

export function verifyOtp(requestData){
  return Post('verify-otp', requestData);
}