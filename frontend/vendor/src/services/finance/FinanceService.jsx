import { CheckSellerAccountCreatedDate } from "adapters/finance/AccountStatement";

export function CreatedDateCheck(){
  return CheckSellerAccountCreatedDate('seller-account-date');
}