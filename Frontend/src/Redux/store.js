import { configureStore } from '@reduxjs/toolkit'
import  AdminSlice  from './reducer/AdminSlice'
import CartSlice from './reducer/CartSlice';
import  UserSlice  from './reducer/UserSlice';

const store = configureStore({
  reducer: {
    admin:AdminSlice,
    cart:CartSlice,
    user:UserSlice

  },
})

export default store;




