import { accountController } from "../../controllers/vendor";
import {tryCatchHandle } from "../../utils";
import { vendorAuthenticationWithoutActive} from '../../middlewares/vendor'
import {upload} from '../../middlewares/commom'

function accountRoutes(app) {
    //Seller Account Info
    app.get('/vendor/seller-account-info',vendorAuthenticationWithoutActive, tryCatchHandle(accountController().getSellerAccountInfo));
    app.patch('/vendor/seller-account-info' ,vendorAuthenticationWithoutActive, tryCatchHandle(accountController().updateSellerAccountInfo))

    //Business Information
    app.get('/vendor/business-info',vendorAuthenticationWithoutActive, tryCatchHandle(accountController().getBusinessInfo));
    app.patch('/vendor/business-info' ,vendorAuthenticationWithoutActive, tryCatchHandle(accountController().updateBusinessInfo))

    // Bank Account
    app.get('/vendor/bank-info',vendorAuthenticationWithoutActive, tryCatchHandle(accountController().getBankInfo));
    app.patch('/vendor/bank-info' ,vendorAuthenticationWithoutActive, upload.single('image'), tryCatchHandle(accountController().updateBankInfo))

    // Warehouse Address
    app.get('/vendor/warehouse-address',vendorAuthenticationWithoutActive, tryCatchHandle(accountController().getWarehouseAddress));
    app.patch('/vendor/warehouse-address' ,vendorAuthenticationWithoutActive, tryCatchHandle(accountController().updateWarehouseAddress))

    // Warehouse Address
    app.get('/vendor/return-address',vendorAuthenticationWithoutActive, tryCatchHandle(accountController().getReturnAddress));
    app.patch('/vendor/return-address' ,vendorAuthenticationWithoutActive, tryCatchHandle(accountController().updateReturnAddress))

    //Seller Logo
    app.get('/vendor/shop-logo',vendorAuthenticationWithoutActive, tryCatchHandle(accountController().getSellerLogo));
    app.patch('/vendor/shop-logo' ,vendorAuthenticationWithoutActive,upload.single('image'), tryCatchHandle(accountController().updateSellerLogo))

    //Seller Photo
    app.get('/vendor/seller-photo',vendorAuthenticationWithoutActive, tryCatchHandle(accountController().getAccountPhoto));
    app.patch('/vendor/seller-photo' ,vendorAuthenticationWithoutActive,upload.single('image'), tryCatchHandle(accountController().updateAccountPhoto))

    //change Password
    app.patch('/vendor/change-password' ,vendorAuthenticationWithoutActive, tryCatchHandle(accountController().changePassword))

    //created date check
    app.get('/vendor/seller-account-date',vendorAuthenticationWithoutActive, tryCatchHandle(accountController().getSellerAccountCreatedDate));
}
export { accountRoutes };