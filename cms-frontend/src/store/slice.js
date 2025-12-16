import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  clickedInCard: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    search2: (state, action) => {
      state.search = action.payload;
    },
    setClickedInCard: (state, action) => {
      state.clickedInCard = action.payload;
    },
  },
});

export const { search2, setClickedInCard } = cartSlice.actions;
export default cartSlice.reducer;
