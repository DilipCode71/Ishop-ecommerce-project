import { createSlice } from '@reduxjs/toolkit'

const initialToken = localStorage.getItem("adminToken");
export const AdminSlice = createSlice({
  name: 'admin',
  initialState:{
    data: null,
    token:initialToken || null


  },
  reducers: {

    
    login: (state,current) =>{

      localStorage.setItem("adminLogin",JSON.stringify(current.payload.data));
      localStorage.setItem("adminToken",current.payload.token);
      state.data=current.payload.data
      state.token=current.payload.token
      
    
    },

    
    logout:(state)=>{
      state.data=null
      localStorage.removeItem("adminLogin")
      localStorage.removeItem("adminToken");

    },

    
  },
})

// Action creators are generated for each case reducer function
export const { login,logout} = AdminSlice.actions

export default AdminSlice.reducer