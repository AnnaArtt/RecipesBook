import React, { useEffect, useState } from "react";
import styles from "./CustomCheckbox.module.scss";

const CustomCheckbox = ({ name, value, onChange, children, check }) => {
  const [checked, setChecked] = useState();

  useEffect(() => {
    if (check) setChecked(true);
  }, [check]);

  return (
    <label>
      <input
        type="checkbox"
        className={styles.checkbox}
        name={name}
        value={value}
        onChange={(event) => {
          onChange(event);
          setChecked(!checked);
        }}
        checked={checked}
      />
      {children}
    </label>
  );
};

export default CustomCheckbox;
