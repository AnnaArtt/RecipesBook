import React, { useMemo } from "react";
import styles from "./RecipeDish.module.scss";
import classNames from "classnames/bind";
import LineKcal from "../LineKcal/LineKcal";
import {
  addRecipesUri,
  removeRecipesUri,
} from "../../localStorage/RecipeLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecipeLikeList,
  removeRecipeLikeList,
} from "../../store/recipeSlice";
const RecipeDish = ({ recipe }) => {
  var cn = classNames.bind(styles);
  const recipeLikeList = useSelector((state) => state.recipes.recipeLikeList);
  const isLike = useMemo(
    () => recipeLikeList.includes(recipe.uri),
    [recipeLikeList]
  );
  const dispatch = useDispatch();

  function addOrRemoveRecipeLike() {
    if (isLike) {
      removeRecipesUri(recipe.uri);
      dispatch(removeRecipeLikeList(recipe.uri));
    } else {
      addRecipesUri(recipe.uri);
      dispatch(addRecipeLikeList(recipe.uri));
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.section_presentation}>
        <img src={recipe.image} alt="" className={styles.img} />
        <div className={styles.general_info}>
          <h2 className={styles.title}>{recipe.label}</h2>
          <p className={styles.description}>{recipe.description}</p>
        </div>
      </div>
      <div className={styles.section_more_description}>
        <h4 className={styles.kcal}>{recipe.kcal} kcal</h4>
        <div className={styles.digest_pfc}>
          {recipe.digest_pfc.map((item) => (
            <div className={styles.group}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  className={cn("digest_type", {
                    yellow: item.label === "Carbs",
                    red: item.label === "Fat",
                    green: item.label === "Protein",
                  })}
                ></div>
                <h4 className={styles.digest_title}>{item.label}</h4>
              </div>
              <h4 className={styles.digest_g}>{Math.round(item.quantity)} g</h4>
            </div>
          ))}
          <LineKcal
            nutrients={recipe.digest_pfc}
            protein={Math.round(recipe.digest_pfc[1].quantity)}
            carbs={Math.round(recipe.digest_pfc[2].quantity)}
          />
        </div>
        <div className={styles.digest_other}>
          {recipe.digest_other.map((item) => (
            <div className={styles.group}>
              <h4>{item.label}</h4>
              <h4>{Math.round(item.quantity)} mg</h4>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.section_ingredients}>
        <h2 className={styles.section_title}>Ingredients</h2>
        {recipe.ingredients.map((ingredient) => (
          <h4 className={styles.ingredients_title}>{ingredient}</h4>
        ))}
      </div>
      <div
        className={cn("star", { star_active: isLike })}
        onClick={addOrRemoveRecipeLike}
      ></div>
    </div>
  );
};

export default RecipeDish;
