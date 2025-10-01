const express = require('express');
const OrderController = require('../Controllers/OrderController');
const OrderRouter = express.Router();

// create order start 
OrderRouter.post(
    '/order-place',
    (req, res) => {
        const result = new OrderController().orderPlace(req.body);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
                console.log(error);
            }
        )
    }
)
// create order end


// create payment-success start 
OrderRouter.post(
    '/payment-success',
    (req, res) => {
        const result = new OrderController().paymentSuccess(req.body);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
                console.log(error);
            }
        )
    }
)
// create payment-success end





OrderRouter.get(
    "/get-orders/:id?", async (req, res) => {
        try {
            const result = await new OrderController().getOrders(req.params.id);
            res.send(result); 
        } catch (error) {
            console.error("Error fetching orders:", error);
            res.status(500).send({
                status: 0,
                msg: "Failed to fetch orders",
                error: error.message || error
            });
        }
    });



module.exports = OrderRouter;