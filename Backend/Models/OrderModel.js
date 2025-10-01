const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define a schema for product details
const productDetailsSchema = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
}, { _id: false });

// Define a schema for shipping details
const shippingDetailsSchema = new Schema({
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
}, { _id: false });




// const ORDER_STATUS_MAP = {
//   0: "Placed",
//   1: "Confirmed",
//   2: "Packed",
//   3: "Shipped",
//   4: "Out for Delivery",
//   5: "Delivered",
//   6: "Cancelled",
//   7: "Returned",
// };


// Define the main order schema
const orderSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    product_details: { type: [productDetailsSchema], required: true },
    order_total: { type: Number, required: true },
    payment_mode: { type: Boolean, required: true }, // 1 for prepaid, 0 for COD
    razorpay_order_id: { type: String, default: null },
    razorpay_payment_id: { type: String, default: null },
    order_status: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5, 6, 7],
        default: 0 // order placed
    }, 
    
    shipping_details: { type: shippingDetailsSchema, required: true }
    
    //     order_status: {
    //   type: Number,
    //   enum: Object.keys(ORDER_STATUS_MAP).map(Number), // [0, 1, ..., 7]
    //   default: 0
    // }
}, { timestamps: true });

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;