const { encryptPassword, decryptPassword, accessToken } = require("../helping");
const UserModel = require("../Models/UserModel");
const CartModel = require("../Models/CartModel");
const mongoose=require("mongoose")


class UserController {
    create(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const checkEmail = await UserModel.findOne({ email: data.email });

                    if (checkEmail) {
                        reject(
                            {
                                msg: "Email already exist",
                                status: 0
                            }
                        )
                    } else {

                        const user = new UserModel(
                            {
                                ...data,
                                password: encryptPassword(data.password)
                            }
                        )

                        user.save().then(
                            (success) => {
                                resolve(
                                    {
                                        msg: "User Created",
                                        status: 1,
                                        user: { ...user.toJSON(), password: null },
                                        token: accessToken(user.toJSON())
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                reject(
                                    {
                                        msg: "User not created",
                                        status: 0
                                    }
                                )
                            }
                        )

                    }
                } catch (error) {
                    console.log(error);
                    reject(
                        {
                            msg: "Internal Server error",
                            status: 0
                        }
                    )
                }
            }
        )
    }
    login(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const user = await UserModel.findOne({ email: data.email });
                    if (user) {
                        if (data.password == decryptPassword(user.password)) {
                            resolve(
                                {
                                    msg: "Login Successfully",
                                    status: 1,
                                    user: { ...user.toJSON(), password: null },
                                    token: accessToken(user.toJSON())
                                }
                            )
                        } else {
                            reject(
                                {
                                    msg: "Password not correct",
                                    status: 0
                                }
                            )
                        }
                    } else {
                        reject(
                            {
                                msg: "Email not found",
                                status: 0
                            }
                        )
                    }
                } catch (error) {
                    console.log(error);
                    reject(
                        {
                            msg: "Internal Server error",
                            status: 0
                        }
                    )
                }
            }
        )
    }

    moveToDb(data, userId) {
        return new Promise(
            async (resolve, reject) => {
                try {

                   
                    if (data) {
                        const allPromise = data.map(
                            async (cartItem) => {
                                const existingProduct = await CartModel.findOne({ product_id: cartItem.productId, user_id:userId }) ?? null;
                                if (existingProduct) {
                                    // update product qty in cart
                                    await CartModel.updateOne(
                                        { _id: existingProduct._id },
                                        {
                                            $inc: {
                                                qty: Number(cartItem.qty)
                                            }
                                        }
                                    )

                                } else {
                                    // new product create in cart
                                    await new CartModel(
                                        {
                                            user_id: userId,
                                            product_id: cartItem.productId,
                                            qty: Number(cartItem.qty)
                                        }
                                    ).save()
                                }

                            }
                        )
                        await Promise.all(allPromise);
                        const latestCart = await CartModel.find({ user_id: userId }).populate("product_id", "_id original_price final_price");


                        resolve(
                            {
                                latestCart: latestCart,
                                msg: "Move to cart successfully",
                                status: 1
                            }
                        )


                    } else {


                         const latestCart = await CartModel.find({ user_id: userId }).populate("product_id", "_id original_price final_price");


                        resolve(
                            {
                                latestCart: latestCart,
                                msg: "Move to db",
                                status: 1
                            }
                        )
                    }

                } catch (error) {
                    console.log(error);
                    reject(
                        {
                            msg: "Internal Server error",
                            status: 0
                        }
                    )
                }
            }
        )
    }

    // addToCart(data) {
    //     return new Promise(
    //         async (resolve, reject) => {
    //             try {
    //                 const existingProduct = await CartModel.findOne({ user_id: data.user_id, product_id: data.product_id });
    //                 if (existingProduct) {

    //                     await CartModel.updateOne({ _id: existingProduct._id },
    //                         {
    //                             $inc: {
    //                                 qty: 1
    //                             }
    //                         }
    //                     ).then(
    //                         (success) => {
    //                             console.log(success);
    //                         }
    //                     ).catch(
    //                         (error) => {
    //                             console.log(error);
    //                         }
    //                     )

    //                 } else {
    //                     // new product add 
    //                     await new CartModel(
    //                         {
    //                             user_id: data.user_id,
    //                             product_id: data.product_id,
    //                             qty: 1
    //                         }
    //                     ).save().then(
    //                         (success) => {
    //                             console.log(success);
    //                         }
    //                     ).catch(
    //                         (error) => {
    //                             console.log(error);
    //                         }
    //                     )
    //                 }

                   
    //             } catch (error) {
    //                 console.log(error);
    //                 reject(
    //                     {
    //                         msg: "Internal Server error",
    //                         status: 0
    //                     }
    //                 )
    //             }
    //         }
    //     )
    // }

addToCart(data) {
    return new Promise(
        async (resolve, reject) => {
            try {
                const existingProduct = await CartModel.findOne({ user_id: data.user_id, product_id: data.product_id });
                if (existingProduct) {

                    await CartModel.updateOne({ _id: existingProduct._id },
                        {
                            $inc: {
                                qty: 1
                            }
                        }).catch((error) => {
                            reject({
                                msg: "Internal Server error",
                                status: 0
                            });
                        });

                } else {
                    // new product add 
                    await new CartModel({
                        user_id: data.user_id,
                        product_id: data.product_id,
                        qty: 1
                    }).save().catch((error) => {
                        reject({
                            msg: "Internal Server error",
                            status: 0
                        });
                    });
                }

                resolve({
                    msg: "Product added to cart successfully",
                    status: 1
                });

            } catch (error) {
                reject({
                    msg: "Internal Server error",
                    status: 0
                });
            }
        }
    );
}


    clearCart(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            await CartModel.deleteMany({ user_id: userId });

            resolve({
                msg: "Cart cleared successfully",
                status: 1
            });
        } catch (error) {
            console.log(error);
            reject({
                msg: "Error clearing cart",
                status: 0
            });
        }
    });
    }
 
    
    removeCartItem(userId, productId) {
        return new Promise(async (resolve, reject) => {
            try {
                await CartModel.deleteOne({ user_id: userId, product_id: productId });
    
                resolve({
                    msg: "Item removed from cart successfully",
                    status: 1
                });
            } catch (error) {
                console.log(error);
                reject({
                    msg: "Error removing item",
                    status: 0
                });
            }
        });
    }
    
     addAddress(userId, addressData) {
        return new Promise(async (resolve, reject) => {
            try {
               
    
                const user = await UserModel.findById(userId);
                if (!user) {
                    return reject({ msg: "User not found", status: 0 });
                }
    
                user.shipping_address.push(addressData);
                await user.save();
    
                resolve({ msg: "Address added successfully", status: 1, addresses: user.shipping_address });
            } catch (error) {
                console.log(error); // Already here
                reject({ msg: "Error adding address", status: 0 });
            }
        });
    }
    
    getAllAddresses(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.findById(userId).select("shipping_address");
                if (!user) {
                    return reject({ msg: "User not found", status: 0 });
                }
    
                resolve({ msg: "Addresses fetched successfully", status: 1, addresses: user.shipping_address });
            } catch (error) {
                console.log(error);
                reject({ msg: "Error fetching addresses", status: 0 });
            }
        });
    }
    
    deleteAddress(userId, index) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.findById(userId);
                if (!user) {
                    return reject({ msg: "User not found", status: 0 });
                }
    
                if (index < 0 || index >= user.shipping_address.length) {
                    return reject({ msg: "Invalid address index", status: 0 });
                }
    
                user.shipping_address.splice(index, 1);
                await user.save();
    
                resolve({ msg: "Address deleted successfully", status: 1, addresses: user.shipping_address });
            } catch (error) {
                console.log(error);
                reject({ msg: "Error deleting address", status: 0 });
            }
        });
    }
    


        updateContact(userId, contact) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!mongoose.Types.ObjectId.isValid(userId)) {
                    reject({ msg: "Invalid user ID", status: 0 });
                    return;
                }

                const updatedUser = await UserModel.findByIdAndUpdate(
                    userId,
                    { contact: contact },
                    { new: true }
                );

                if (!updatedUser) {
                    reject({ msg: "User not found", status: 0 });
                    return;
                }

                resolve({
                    msg: "Contact updated successfully",
                    status: 1,
                    user: { ...updatedUser.toJSON(), password: null }
                });
            } catch (error) {
                console.error(error);
                reject({ msg: "Internal server error", status: 0 });
            }
        });
    }
         



    updateCartQty(userId, productId, qty) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId || !productId || qty < 1) {
                return reject({ msg: "Invalid input", status: 0 });
            }

            const updated = await CartModel.findOneAndUpdate(
                { user_id: userId, product_id: productId },
                { $set: { qty: qty } },
                { new: true }
            );

            if (!updated) {
                return reject({ msg: "Cart item not found", status: 0 });
            }

            resolve({ msg: "Cart quantity updated", status: 1, updatedCartItem: updated });
        } catch (error) {
            console.log(error);
            reject({ msg: "Internal server error", status: 0 });
        }
    });
}

    
}

module.exports = UserController