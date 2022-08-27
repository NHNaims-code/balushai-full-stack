import { Order, Review } from "../../mongodb/common";
import { Customer } from "../../mongodb/customer";
import { Product, Vendor } from "../../mongodb/vendor";

export const createCustomerReview = async (user_id, data) => {
    try {
        const { product_id, order_id, vendor_id } = data;
        const newReview = await new Review(data);
        const savedReview = await newReview.save();
        await pushCustomerReviews(user_id, newReview._id);
        await pushVendorReviews(vendor_id, newReview._id);
        await pushProductReviews(product_id, newReview._id);
        await pushOrderReview(order_id, newReview._id);
        return savedReview;
    } catch (err) {
        console.log(err)
    }
}

const pushCustomerReviews = async (user_id, review_id) => {
    let reviewsArray = await Customer.findOne({ _id: user_id }).lean().select('reviews -_id') || [];
    const { reviews } = reviewsArray;
    reviews?.push({ _id: review_id });
    await Customer.findOneAndUpdate({ _id: user_id }, { reviews }).lean();
}

const pushVendorReviews = async (vendor_id, review_id) => {
    let reviewsArray = await Vendor.findOne({ _id: vendor_id }).lean().select('reviews -_id') || [];
    const { reviews } = reviewsArray;
    reviews?.push({ _id: review_id });
    await Vendor.findOneAndUpdate({ _id: vendor_id }, { reviews }).lean();
}

const pushProductReviews = async (product_id, review_id) => {
    let reviewsArray = await Product.findOne({ _id: product_id }).lean().select('reviews -_id') || [];
    const { reviews } = reviewsArray;
    reviews?.push({ _id: review_id });
    await Product.findOneAndUpdate({ _id: product_id }, { reviews }).lean();
}

const pushOrderReview = async (order_id, review_id) => {
    await Order.findOneAndUpdate({ _id: order_id }, { review_id }).lean();
}

export const replyVendorReview = async (query, data) => {
    try {
        return await Review.findOneAndUpdate(query, { $set: data }).lean();
    } catch (err) {
        console.log(err)
    }
}

export const reportVendorReview = async (query, data) => {
    try {
        return await Review.findOneAndUpdate(query, { $set: data }).lean();
    } catch (err) {
        console.log(err)
    }
}