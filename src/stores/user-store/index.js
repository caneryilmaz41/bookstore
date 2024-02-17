import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";

const initialState={
    user:{}
}
 export const fetchUser=createAsyncThunk("user/fetchUser",async()=>{
    return Promise.resolve({id:1,name:"Caner YILMAZ"})
})
export const{reducer,actions}=createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchUser.fulfilled,(state,actions)=>{
            state.user=actions.payload;
        });
    }
})