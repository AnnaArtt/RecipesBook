import React from "react";
import logo from "../../assets/logo.png";
import styles from "./HeadBlock.module.scss";
import NavLinks from "../NavLinks/NavLinks";

const HeaderBlock = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="" className={styles.logo_img} />
        <h2 className={styles.logo_title}>Love.Live.Eat</h2>
      </div>
      <NavLinks />
    </header>
  );
};

export default HeaderBlock;
