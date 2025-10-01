import { createSlice } from '@reduxjs/toolkit'

export const CartSlice = createSlice({
  name: 'cart',
  initialState:{
    data: [] ,
    totalOriginalPrice:0,
    totalFinalPrice:0,
  
  },
  reducers: {

    addToCart: (state,current) =>{

      const product = state.data.find(
        (product) => product.productId === current.payload.productId
      );
      
      if(product){
        product.qty++;
      }else{
        state.data.push({productId:current.payload.productId , qty:1 }); 
      }

      state.totalOriginalPrice +=current.payload.original_price
       state.totalFinalPrice +=current.payload.final_price

        localStorage.setItem("cartItem",JSON.stringify(state.data));
        localStorage.setItem("totalOriginalPrice",state.totalOriginalPrice);
        localStorage.setItem("totalFinalPrice",state.totalFinalPrice);
    },




    moveToCartDataSave: (state,{payload}) =>{
        state.data = payload.data;
        state.totalOriginalPrice = payload.totalOriginalPrice
        state.totalFinalPrice = payload.totalFinalPrice
        localStorage.setItem("cartItem", JSON.stringify(state.data));
        localStorage.setItem("totalOriginalPrice", state.totalOriginalPrice);
        localStorage.setItem("totalFinalPrice", state.totalFinalPrice);
    },

    
    removeTOCart: (state) => {
      state.data = []; 
      state.totalOriginalPrice =0; 
      state.totalFinalPrice =0; 
      localStorage.removeItem("cartItem"); 
      localStorage.removeItem("totalOriginalPrice"); 
      localStorage.removeItem("totalFinalPrice"); 
    },


      removeSingleItemFromCart: (state, current) => {
        const removedItem = state.data.find(
          (item) => item.productId === current.payload.productId
        );
      
        if (removedItem) {
          const qty = removedItem.qty;
      
          state.totalOriginalPrice -= current.payload.original_price * qty;
          state.totalFinalPrice -= current.payload.final_price * qty;
      
          state.data = state.data.filter(
            (item) => item.productId !== current.payload.productId
          );
      
          // Updated data localStorage me set karo
          localStorage.setItem("cartItem", JSON.stringify(state.data));
          localStorage.setItem("totalOriginalPrice", state.totalOriginalPrice);
          localStorage.setItem("totalFinalPrice", state.totalFinalPrice);
        }
      },
    

  lsGetData: (state) => {
  const oldCartData = JSON.parse(localStorage.getItem("cartItem")) ?? [];
  const totalFinalPrice = localStorage.getItem("totalFinalPrice");
  const totalOriginalPrice = localStorage.getItem("totalOriginalPrice");

  state.data = oldCartData;
  state.totalOriginalPrice = totalOriginalPrice ? Number(totalOriginalPrice) : 0;
  state.totalFinalPrice = totalFinalPrice ? Number(totalFinalPrice) : 0;
},



updateQty: (state, { payload }) => {
  const updatedItem = state.data.find(item => item.productId === payload.productId);

  if (updatedItem) {
    const previousQty = updatedItem.qty;
    const newQty = payload.qty;
    
    updatedItem.qty = newQty;

    state.totalOriginalPrice += (payload.original_price * (newQty - previousQty));
   state.totalFinalPrice += (payload.final_price * (newQty - previousQty));


    localStorage.setItem("cartItem", JSON.stringify(state.data));
    localStorage.setItem("totalOriginalPrice", state.totalOriginalPrice.toFixed(2));
    localStorage.setItem("totalFinalPrice", state.totalFinalPrice.toFixed(2));
  }
},



 
  },



})



export const { addToCart,moveToCartDataSave,removeTOCart,removeSingleItemFromCart,lsGetData,updateQty} = CartSlice.actions

export default CartSlice.reducer