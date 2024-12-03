import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = { data: {} };

const websiteSlice = createSlice({
    name: 'website',
    initialState,
    reducers: {
       setWebsiteData: (state, action) => {
           state.data = action.payload;
       },
       
    },
});



export default websiteSlice.reducer;
export const { setWebsiteData } = websiteSlice.actions;

