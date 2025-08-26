import {createSlice} from "@reduxjs/toolkit";

 const userSlice = createSlice({
    name:"user",
    initialState:{
        authUser:null,
        onlineUsers:[]
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser = action.payload;
        },
        setOnlineUsers:(state,action)=>{
             state.onlineUsers = action.payload;
         }
    }
});

export const {setAuthUser , setOnlineUsers} = userSlice.actions;
export default userSlice.reducer;