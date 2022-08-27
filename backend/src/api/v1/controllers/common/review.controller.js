import { createCustomerReview, replyVendorReview, reportVendorReview } from "../../services/common";
import { error, objectValidatorEscape } from "../../utils"
import { reportReviewValidation, reviewValidation } from "../../validations";
import { replyReviewValidation } from "../../validations";
import validator from "validator";

const reviewController = () => {
    return {

        // make an order
        createReview: async (req, res) => {

            const validation = reviewValidation(req.body);
            //console.log(validation.error)
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            const { description } = req.body;

            const createdReview = await createCustomerReview(req.user?._id, {
                ...req.body,
                description: validator.escape(description),
                user_id : req.user?._id
            });
            return res.status(200).json(createdReview);
        },

        // reply review by vendor
        replyReview: async (req, res) => {

            const validation = replyReviewValidation(req.body);
            //console.log(validation.error)
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            const refactor_data = objectValidatorEscape(req.body);

            const repliedReview = await replyVendorReview({ $and: [{ _id: review_id }, { vendor_id: req.user?._id }] }, {
                ...refactor_data,
                status: 'REPLIED',
            });
            return res.status(200).json(repliedReview);
        },

        // report review by vendor
        reportReview: async (req, res) => {

            const validation = reportReviewValidation(req.body);
            //console.log(validation.error)
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            const refactor_data = objectValidatorEscape(req.body);

            const reportedReview = await reportVendorReview({ $and: [{ _id: review_id }, { vendor_id: req.user?._id }] }, refactor_data);
            return res.status(200).json(reportedReview);
        },
    }
}

export { reviewController }