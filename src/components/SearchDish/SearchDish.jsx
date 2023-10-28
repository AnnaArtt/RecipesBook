import React, { useState, useEffect } from "react";
import styles from "./SearchDish.module.scss";
import { useDispatch } from "react-redux";
import {
  loadRecipes,
  addParameters,
  setRecipeLikeList,
} from "../../store/recipeSlice";
import FiltersDish from "../FiltersDish/FiltersDish";
import classNames from "classnames/bind";
import { useSearchParams } from "react-router-dom";
import { getLocalStoreItem } from "../../localStorage/RecipeLocalStorage";

const SearchDish = () => {
  var cn = classNames.bind(styles);

  const [comp, setComp] = useState(false);
  const [dishName, setDishName] = useState("");
  const [otherParam, setOtherParam] = useState({});
  const [emptyInput, setEmptyInput] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchParams.toString() !== "") {
      if (searchParams?.get("q")) setDishName(searchParams?.get("q"));
      if (searchParams?.getAll("diet"))
        setOtherParam({ diet: searchParams?.getAll("diet"), ...otherParam });
      if (searchParams?.getAll("mealType"))
        setOtherParam({ diet: searchParams?.getAll("diet"), ...otherParam });
      if (searchParams?.get("calories"))
        setOtherParam({ diet: searchParams?.get("diet"), ...otherParam });
      console.log("here");
      setComp(true);
    }
  }, []);

  useEffect(() => {
    console.log(otherParam);
    if (comp) setDishNameForSearch();
  }, [comp]);

  function setDishNameForSearch() {
    if (dishName !== "") {
      let recipesLikeList = getLocalStoreItem("recipesLike");
      if (recipesLikeList !== null && recipesLikeList !== "") {
        dispatch(setRecipeLikeList(recipesLikeList.split(",")));
      }

      dispatch(addParameters({ q: dishName, ...otherParam }));
      dispatch(loadRecipes({}));

      console.log({ q: dishName, ...otherParam });
      setSearchParams({ q: dishName, ...otherParam });
      setEmptyInput(false);
    } else {
      setEmptyInput(true);
    }
  }

  function addOtherParam(otherParam) {
    setOtherParam(otherParam);
  }

  return (
    <section className={styles.sectionWrapper}>
      <FiltersDish sendFiltersParam={addOtherParam} queryParams={otherParam} />

      <div className={styles.wrapper}>
        <h2 className={styles.title}>Find the dish </h2>
        <input
          type="text"
          className={cn("input_dish", { input_empty: emptyInput })}
          value={dishName}
          onInput={(event) => {
            setDishName(event.target.value);
          }}
        />
        <button className={styles.button_dish} onClick={setDishNameForSearch}>
          Search
        </button>
      </div>
    </section>
  );
};

export default SearchDish;
