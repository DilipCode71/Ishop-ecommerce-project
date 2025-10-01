const express = require('express');
const UserController = require('../Controllers/UserController');
const UserRouter = express.Router();


// create user start 
UserRouter.post(
    '/create',
    (req, res) => {
        const result = new UserController().create(req.body);
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
// create user end



// login user start 
UserRouter.post(
    '/login',
    (req, res) => {
        const result = new UserController().login(req.body);
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
// login user end




// cart data move to mongoDb start 
UserRouter.post(
    '/movetodb/:userId',
    (req, res) => {
        
        const result = new UserController().moveToDb(req.body,req.params.userId);
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

// cart data move to mongoDb start 



// add to cart  data move to mongoDb start 
UserRouter.post(
    '/addToCart',
    (req, res) => {
        const result = new UserController().addToCart(req.body);
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


// add to cart  move to mongoDb start 



// UserRouter.js

UserRouter.post('/clear-cart/:userId', async (req, res) => {
    try {
        const result = await new UserController().clearCart(req.params.userId);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send({
            msg: "Internal Server Error",
            status: 0
        });
    }
});



UserRouter.post('/remove-cart-item', async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const result = await new UserController().removeCartItem(userId, productId);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send({
            msg: "Internal Server Error",
            status: 0
        });
    }
});




// Add new address
UserRouter.post('/add-address/:userId', async (req, res) => {


    
    try {
       
        const result = await new UserController().addAddress(req.params.userId, req.body);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send({ msg: "Internal Server Error", status: 0 });
    }
});

// Get all addresses
UserRouter.get('/get-addresses/:userId', async (req, res) => {
    try {
        const result = await new UserController().getAllAddresses(req.params.userId);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send({ msg: "Internal Server Error", status: 0 });
    }
});



// Delete address by index
UserRouter.delete('/delete-address/:userId/:index', async (req, res) => {
    try {
        const { userId, index } = req.params;
        const result = await new UserController().deleteAddress(userId, index);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send({ msg: "Internal Server Error", status: 0 });
    }
});


UserRouter.put("/update-contact/:userId", (req, res) => {
    const result = new UserController().updateContact(req.params.userId, req.body.contact);
    result.then((response) => res.send(response)).catch((error) => res.status(400).send(error));
});



UserRouter.post('/update-cart-qty', async (req, res) => {
    try {
        const { userId, productId, qty } = req.body;
        const result = await new UserController().updateCartQty(userId, productId, qty);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send({ msg: "Internal Server Error", status: 0 });
    }
});



module.exports = UserRouter;