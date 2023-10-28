import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadMoreRecipes, resetState } from "../../store/recipeSlice";

import RecipeDish from "../RecipeDish/RecipeDish";
import LoaderReact from "../LoaderReact/LoaderReact";

const ListRecipeDish = () => {
  const recipes = useSelector((state) => state.recipes.recipes);
  const status = useSelector((state) => state.recipes.status);

  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
      dispatch(resetState());
    };
  }, []);

  const onScroll = (event) => {
    const scrollHeight = event.target.documentElement.scrollHeight;
    const scrollTop = event.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    if (scrollHeight - 100 < scrollTop + innerHeight) {
      dispatch(loadMoreRecipes());
    }
  };

  return (
    <div>
      {recipes.length > 0 ? (
        recipes?.map((recipe, index) => (
          <RecipeDish key={index} recipe={recipe} />
        ))
      ) : (
        <h2>List is empty</h2>
      )}

      {status === "pending" ? <LoaderReact /> : ""}

      {status === "rejected" ? <h2>Error</h2> : ""}
    </div>
  );
};

export default ListRecipeDish;
