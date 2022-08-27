import { SendSms } from "adapters/sms/Sms";

export function sendSms(data) {
    return SendSms('sms/send-sms', data);
}


