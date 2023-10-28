import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRecipes,
  getMoreRecipes,
  getRecipesByUri,
} from "../services/recipeService";
import { getLocalStoreItem } from "../localStorage/RecipeLocalStorage";

export const loadRecipes = createAsyncThunk(
  "recipes/loadRecipes",
  async (_, { rejectWithValue, dispatch, getState }) => {
    dispatch(setRecipes([]));
    let customerParameters = getState().recipes.parameters;
    const recipes = await getRecipes(customerParameters);
    dispatch(setNextPage(recipes.data._links.next.href));
    let processedRecipes = recipeProcessing(recipes.data.hits);
    dispatch(setRecipes(processedRecipes));
    dispatch(setParameters({}));
    /////////////////////////////////////////////////////////////

    // let recipesLikeList = getLocalStoreItem("recipesLike");
    // if (recipesLikeList !== null && recipesLikeList !== "") {
    //   dispatch(setRecipeLikeList(recipesLikeList.split(",")));
    // }
  }
);

export const loadMoreRecipes = createAsyncThunk(
  "recipes/loadMoreRecipes",
  async (_, { dispatch, getState }) => {
    if (!getState().recipes.loadMore) {
      dispatch(setLoadMore());
      let nextPage = getState().recipes.nextPage;
      const recipes = await getMoreRecipes(nextPage);
      dispatch(setNextPage(recipes.data._links.next.href));
      let processedRecipes = recipeProcessing(recipes.data.hits);
      dispatch(addRecipes(processedRecipes));
      dispatch(setLoadMore());
    }
  }
);

export const loadRecipeByUri = createAsyncThunk(
  "recipes/loadRecipeByUri",
  async (_, { dispatch, getState }) => {
    let recipeLikeList = getState().recipes.recipeLikeList;
    console.log(recipeLikeList);

    let recipeLikeArray = [];
    for (const uri of recipeLikeList) {
      const recipes = await getRecipesByUri(uri);
      let processedRecipes = recipeProcessing(recipes.data.hits);
      console.log(processedRecipes);
      recipeLikeArray.push(...processedRecipes);
    }

    dispatch(setRecipes(recipeLikeArray));
    console.log(getState().recipes.recipes);
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    recipeLikeList: [],
    parameters: {},
    status: "",
    nextPage: "",
    loadMore: false,
  },
  reducers: {
    setRecipes(state, action) {
      state.recipes = action.payload;
    },
    addRecipes(state, action) {
      state.recipes.push(...action.payload);
      // state.recipes = [...state.recipes, ...action.payload];
    },
    addParameters(state, action) {
      state.parameters = { ...state.parameters, ...action.payload };
    },
    setParameters(state, action) {
      state.parameters = action.payload;
    },
    setNextPage(state, action) {
      state.nextPage = action.payload;
    },
    setLoadMore(state, action) {
      console.log("true");
      state.loadMore = !state.loadMore;
      console.log(state.loadMore);
    },
    setRecipeLikeList(state, action) {
      state.recipeLikeList = action.payload;
    },
    addRecipeLikeList(state, action) {
      state.recipeLikeList.push(action.payload);
    },
    removeRecipeLikeList(state, action) {
      state.recipeLikeList = state.recipeLikeList.filter(
        (item) => item !== action.payload
      );
    },
    resetState(state) {
      return {
        recipes: [],
        recipeLikeList: [],
        parameters: {},
        status: "",
        nextPage: "",
        loadMore: false,
      };
    },
  },
  extraReducers: {
    [loadRecipes.pending]: (state, action) => {
      state.status = "pending";
    },
    [loadRecipes.fulfilled]: (state, action) => {
      state.status = "fulfilled";
    },
    [loadRecipes.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [loadMoreRecipes.pending]: (state, action) => {
      state.status = "pending";
    },
    [loadMoreRecipes.fulfilled]: (state, action) => {
      state.status = "fulfilled";
    },
    [loadMoreRecipes.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [loadRecipeByUri.pending]: (state, action) => {
      state.status = "pending";
    },
    [loadRecipeByUri.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      console.log(action.payload);
    },
    [loadRecipeByUri.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export const {
  setRecipes,
  addParameters,
  setParameters,
  setNextPage,
  addRecipes,
  setLoadMore,
  setRecipeLikeList,
  addRecipeLikeList,
  removeRecipeLikeList,
  resetState,
} = recipeSlice.actions;

export default recipeSlice.reducer;

function recipeProcessing(recipes) {
  let newRecipesArray = recipes.map((item) => ({
    image: item.recipe.image,
    label: item.recipe.label,
    kcal: Math.round(item.recipe.calories),
    description: item.recipe.healthLabels.join(" • "),
    digest_pfc: [
      item.recipe.totalNutrients.CHOCDF,
      item.recipe.totalNutrients.FAT,
      item.recipe.totalNutrients.PROCNT,
    ],
    digest_other: [
      item.recipe.totalNutrients.CHOLE,
      item.recipe.totalNutrients.NA,
      item.recipe.totalNutrients.FE,
      item.recipe.totalNutrients.CA,
      item.recipe.totalNutrients.MG,
    ],
    ingredients: item.recipe.ingredientLines,
    uri: item.recipe.uri,
  }));
  return newRecipesArray;
}
