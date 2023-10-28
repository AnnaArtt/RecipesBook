import React, { useState } from "react";
import styles from "./FiltersDish.module.scss";
import classNames from "classnames/bind";
import CustomCheckbox from "../UI/CustomCheckbox/CustomCheckbox";

const FiltersDish = ({ sendFiltersParam, queryParams }) => {
  var cn = classNames.bind(styles);

  const dietArray = [
    "Balanced",
    "High-Fiber",
    "High-Protein",
    "Low-Carb",
    "Low-Fat",
    "Low-Sodium",
  ];
  const mealTypeArray = ["Breakfast", "Dinner", "Lunch", "Snack", "Teatime"];

  const [filtersParam, setFiltersParam] = useState({
    diet: [],
    mealType: [],
    calories: "",
  });
  const [errorInput, setErrorInput] = useState(false);

  const addFiltersParam = (event, newFiltersParam) => {
    newFiltersParam[event.target.name].push(event.target.value);
  };

  const removeFiltersParam = (event, newFiltersParam) => {
    let res = filtersParam[event.target.name].filter(
      (item) => item !== event.target.value
    );
    console.log(res);
    newFiltersParam[event.target.name] = res;
  };

  const changeFiltersParam = (event) => {
    let newFiltersParam = JSON.parse(JSON.stringify(filtersParam));

    if (event.target.type === "checkbox") {
      {
        event.target.checked
          ? addFiltersParam(event, newFiltersParam)
          : removeFiltersParam(event, newFiltersParam);
      }
    } else {
      setKcal(event, newFiltersParam);
    }
    setFiltersParam(newFiltersParam);

    if (!errorInput) {
      sendFiltersParam(newFiltersParam);
    }
  };

  const setKcal = (event, newFiltersParam) => {
    setErrorInput(false);
    if (!caloriesValidation(event.target.value) && event.target.value !== "") {
      setErrorInput(true);
    }
    newFiltersParam.calories = event.target.value;
  };

  const checkQueryParams = (value) => {
    if (queryParams && queryParams.diet) {
      //  console.log(queryParams.diet);
      //console.log(value);
      return queryParams.diet.includes(value);
    }
    return false;
  };

  const caloriesValidation = (str) => {
    let rex = /\d+/;
    return rex.test(str);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.smallWrapper}>
        <ul>
          <h4 className={styles.title}>Diet</h4>
          <div className={styles.wrapper_li}>
            {dietArray.map((value) => (
              <li>
                <CustomCheckbox
                  name="diet"
                  value={value.toLowerCase()}
                  onChange={changeFiltersParam}
                  check={checkQueryParams(value.toLowerCase())}
                >
                  {value}
                </CustomCheckbox>
              </li>
            ))}
          </div>
        </ul>
        <ul>
          <h4 className={styles.title}>Meal time</h4>
          <div className={styles.wrapper_li}>
            {mealTypeArray.map((value) => (
              <li>
                <CustomCheckbox
                  name="mealType"
                  value={value.toLowerCase()}
                  onChange={changeFiltersParam}
                >
                  {value}
                </CustomCheckbox>
              </li>
            ))}
          </div>
        </ul>
        <div className={styles.ul}>
          <h4 className={styles.title}>Calories</h4>
          <label>
            <input
              type="text"
              name="calories"
              value={filtersParam.calories}
              onInput={changeFiltersParam}
              className={cn({ inputError: errorInput })}
            />
            kcal
          </label>
        </div>
      </div>
    </div>
  );
};

export default FiltersDish;
