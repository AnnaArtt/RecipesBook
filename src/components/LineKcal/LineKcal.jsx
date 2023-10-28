import React, { useEffect, useMemo, useState } from "react";
import cn from "classnames";
import styles from "./LineKcal.module.scss";

const LineKcal = ({ nutrients }) => {
  const [nutrientsData, setNutrientsData] = useState([]);
  const [coefficient, setCoefficient] = useState(0);

  useEffect(() => {
    prepareDataNutrients();
  }, [nutrients]);

  function prepareDataNutrients() {
    let new_nutrients_array = nutrients.map(({ quantity, label }) => ({
      quantity: Math.round(Number(quantity)),
      label,
    }));
    findCoefficient(new_nutrients_array);
    setNutrientsData(new_nutrients_array);
  }

  function findCoefficient(nutrientsData) {
    let denominator = 0;
    nutrientsData.forEach(({ quantity }) => (denominator += quantity));
    setCoefficient(200 / denominator);
  }

  return (
    <div className={styles.wrapper}>
      {nutrientsData.map(({ quantity, label }) => (
        <div
          style={{ width: `${quantity * coefficient}px` }}
          className={cn(styles.general, {
            [styles.yellow]: label === "Carbs",
            [styles.red]: label === "Fat",
            [styles.green]: label === "Protein",
          })}
        ></div>
      ))}
    </div>
  );
};

export default LineKcal;
