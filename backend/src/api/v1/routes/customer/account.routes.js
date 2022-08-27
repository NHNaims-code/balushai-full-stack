import { accountController } from "../../controllers/customer";
import { tryCatchHandle } from "../../utils";
import { upload} from '../../middlewares/commom'
import {customerAuthentication} from '../../middlewares/customer'

function accountRoutes(app) {
    //Customer Account Info
    app.get('/customer/account-info', customerAuthentication, tryCatchHandle(accountController().getCustomerAccountInfo));
    app.patch('/customer/account-info' ,customerAuthentication , tryCatchHandle(accountController().updateCustomerAccountInfo))

    //Profile Photo
    app.get('/customer/profile-photo',customerAuthentication, tryCatchHandle(accountController().getAccountPhoto));
    app.patch('/customer/profile-photo' ,customerAuthentication, upload.single('image'), tryCatchHandle(accountController().updateAccountPhoto))

    //change Password
    app.patch('/customer/change-password' ,customerAuthentication, tryCatchHandle(accountController().changePassword))
}
export { accountRoutes };