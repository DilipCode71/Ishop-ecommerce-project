require("dotenv").config();
const CartModel = require("../Models/CartModel");
const OrderModel = require("../Models/OrderModel");
const Razorpay = require("razorpay");
const crypto=require("crypto");

var RazorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_id,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

class OrderController {
  orderPlace(orderData) {
    return new Promise(async (resolve, reject) => {
      try {
        const cartData = await CartModel.find({
          user_id: orderData.user_id,
        }).populate("product_id", "_id final_price");

        const productDetails = cartData.map((cartItem) => {
          return {
            product_id: cartItem.product_id._id,
            qty: cartItem.qty,
            price: cartItem.product_id.final_price,
            total: cartItem.product_id.final_price * cartItem.qty,
          };
        });

        const order = await new OrderModel({
          user_id: orderData.user_id,
          product_details: productDetails,
          order_total: orderData.order_total,
          payment_mode: orderData.payment_mode,
          shipping_details: orderData.shipping_details,
        });

        order
          .save()
          .then((success) => {
            if (success.payment_mode == 0) {
              resolve({
                msg: "Order Placed Successfully",
                status: 1,
                order_id: order._id,
              });
            } else {
              this.initialPaymentGateWay(order._id, orderData.order_total)
                .then((razorpay_order) => {
                  resolve({
                    msg: "Order  created in Razorpay",
                    status: 1,
                    razorpay_order,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  reject({
                    msg: "Order not place",
                    status: 0,
                  });
                });
            }
          })
          .catch((error) => {
            console.log(error);
            resolve({
              msg: "Order not place",
              status: 0,
            });
          });
      } catch (error) {
        console.log(error);
        reject({
          msg: "Internal Server error",
          status: 0,
        });
      }
    });
  }

  initialPaymentGateWay(order_Id, order_total) {
    return new Promise((resolve, reject) => {
      try {

      const amountInPaise = Math.round(Number(order_total) * 100);

        var options = {
          amount: amountInPaise,
          currency: "INR",
          receipt: order_Id,
        };

        RazorpayInstance.orders.create(options, async function (err, razorpay_order) {

          if (err) {
            console.log("Razorpay Error:", err);
            reject({
              msg: "Payment gateway error",
              status: 0,
            });
          } else {

              await  OrderModel.updateOne(
                {_id:order_Id},
                {
                  razorpay_order_id:razorpay_order.id
                }
              )
            resolve({
              msg: "Order created in Razorpay",
              status: 1,
              razorpay_order:razorpay_order.id, 
              order_id: razorpay_order.receipt, 
              amount: razorpay_order.amount,
              currency: razorpay_order.currency,
            });
          }
        });
      } catch (error) {
        console.log(error);
        reject({
          msg: "Internal Server error",
          status: 0,
        });
      }
    });
  }


  async paymentSuccess(order_data){
    return new Promise( 
      async (resolve,reject)=> {
        try {


          

        const { order_id, user_id, razorpay_response } = order_data;
        
        // Create data string for signature verification
        const data = razorpay_response.razorpay_order_id + "|" + razorpay_response.razorpay_payment_id;

        // Generate HMAC-SHA256 signature using secret key
        const generatedSignature = crypto
        .createHmac('sha256', process.env. RAZORPAY_KEY_SECRET)
        .update(data)
        .digest('hex');

        // Compare signatures

       if (generatedSignature === razorpay_response.razorpay_signature) {
              await CartModel.deleteMany({ user_id });
            
              const updatedOrder = await OrderModel.findOneAndUpdate(
                { razorpay_order_id: razorpay_response.razorpay_order_id },
                {
                  razorpay_payment_id: razorpay_response.razorpay_payment_id,
                  order_status: 1
                },
                { new: true } // 🟢 Yeh zaroori hai taaki updated document mile
              );
            
              resolve({
                msg: "Order Place",
                status: 1,
                order_id: updatedOrder._id 
              });
            }
            else{
          reject(
            {
              msg:"Payment verification failed",
              status:0
            }
          )
        }



        }catch(error) {
          console.log(error);
          reject(
            {
              msg:"Internal server error",
              status:0
            }
          )

        }


      }
    )
  }




    getOrders(orderId) {
        return new Promise(async (resolve, reject) => {
            try {
                let Orders;
                if (orderId) {
                    Orders = await OrderModel.findById(orderId).populate('user_id').populate('product_details.product_id');
                    if (!Orders) {
                        return reject({
                            status: 0,
                            msg: "Order not found",
                            error: "No matching order found"
                        });
                    }
                } else {
                    Orders = await OrderModel.find().populate('user_id').populate('product_details.product_id');
                }
                resolve({
                    status: 1,
                    msg: "Orders fetched successfully",
                    Orders
                });
            } catch (error) {
                console.log("Error fetching orders:", error);
                reject({
                    status: 0,
                    msg: "Failed to fetch orders",
                    error
                });
            }
        });
    }


}


module.exports = OrderController;
