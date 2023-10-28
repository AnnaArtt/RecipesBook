import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./recipeSlice";

export default configureStore({
  reducer: {
    recipes: recipeReducer,
  },
});
