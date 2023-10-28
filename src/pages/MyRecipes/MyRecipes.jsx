import React, { useEffect } from "react";
import styles from "./MyRecipes.module.scss";
import { useDispatch } from "react-redux";
import { getLocalStoreItem } from "../../localStorage/RecipeLocalStorage";
import { loadRecipeByUri, setRecipeLikeList } from "../../store/recipeSlice";
import ListRecipeDish from "../../components/ListRecipeDish/ListRecipeDish";
const MyRecipes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let recipes = getLocalStoreItem("recipesLike");
    if (recipes !== null) {
      recipes = recipes.split(",");
      dispatch(setRecipeLikeList(recipes));
      dispatch(loadRecipeByUri());
    }
  }, []);
  return (
    <section className={styles.wrapper}>
      <h2>My Recipes</h2>
      <ListRecipeDish />
    </section>
  );
};

export default MyRecipes;
