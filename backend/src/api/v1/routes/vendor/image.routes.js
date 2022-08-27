import { imageController } from "../../controllers/common";
import { upload } from "../../middlewares/commom";
import { vendorAuthentication } from "../../middlewares/vendor";
import { tryCatchHandle } from "../../utils";

function imageRoutes(app) {
    app.post('/vendor/image/upload', vendorAuthentication, upload.single('image'), tryCatchHandle(imageController().uploadImage));
    app.post('/vendor/document/upload', vendorAuthentication, upload.single('image'), tryCatchHandle(imageController().uploadDocument));
    app.delete('/vendor/image/delete/balushai/product/:public_id', vendorAuthentication, tryCatchHandle(imageController().deleteImage));
    app.delete('/vendor/image/delete/balushai/documents/:public_id', vendorAuthentication, tryCatchHandle(imageController().deleteDocument));
}
export { imageRoutes };