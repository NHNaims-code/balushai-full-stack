import { tryCatchHandle } from "../../utils";
import {customerAuthentication} from '../../middlewares/customer'
import {vendorAuthentication} from '../../middlewares/vendor/auth.middleware'
import { reviewController } from "../../controllers/common";

function reviewRoutes(app) {

    // ******* Customer *******
    //Create Review customer 
    app.post('/customer/create-review', customerAuthentication, tryCatchHandle(reviewController().createReview));

    // ******* Vendor *******
    //reply review by vendor
    app.patch('/vendor/reply-review', vendorAuthentication, tryCatchHandle(reviewController().replyReview));
    //report review by vendor
    app.get('/vendor/report-review', vendorAuthentication, tryCatchHandle(reviewController().reportReview));
}
export { reviewRoutes };