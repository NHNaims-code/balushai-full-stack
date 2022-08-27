import { campaignController } from "../../../controllers/vendor";
import { vendorAuthentication } from "../../../middlewares/vendor";
import { tryCatchHandle } from "../../../utils";

function campaignRoutes(app) {
    app.get(
        "/vendor/promotions/online-campaigns",
        vendorAuthentication,
        tryCatchHandle(campaignController().getAllOnlineCampaigns)
    );
    app.get(
        "/vendor/promotions/campaign/:id",
        vendorAuthentication,
        tryCatchHandle(campaignController().getSingleCampaign)
    );
    app.get(
        "/vendor/promotions/incoming-campaigns",
        vendorAuthentication,
        tryCatchHandle(campaignController().getAllIncomingCampaigns)
    );
    app.get(
        "/vendor/promotions/online-registered-campaigns",
        vendorAuthentication,
        tryCatchHandle(campaignController().getAllRegisteredOnlineCampaigns)
    );
    app.get(
        "/vendor/promotions/incoming-registered-campaigns",
        vendorAuthentication,
        tryCatchHandle(campaignController().getAllRegisteredIncomingCampaigns)
    );
    app.patch(
        "/vendor/promotions/campaign/:id/register",
        vendorAuthentication,
        tryCatchHandle(campaignController().registerCampaign)
    );
    app.get(
        "/vendor/promotions/register-campaign/:id",
        vendorAuthentication,
        tryCatchHandle(campaignController().getRegisteredCampaign)
    );
    app.patch(
        "/vendor/promotions/campaign/:id/add-product",
        vendorAuthentication,
        tryCatchHandle(campaignController().productAddInCampaign)
    );
    app.patch(
        "/vendor/promotions/campaign/:id/remove-product",
        vendorAuthentication,
        tryCatchHandle(campaignController().productRemoveInCampaign)
    );
}
export { campaignRoutes };
