import React from "react";
import { Link, useMatch } from "react-router-dom";
import classnames from "classnames/bind";
import styles from "./CustomLink.module.scss";

const CustomLink = ({ to, children }) => {
  const match = useMatch(to);
  let cn = classnames.bind(styles);
  return (
    <Link to={to} className={cn("nameLink", { activeLink: match })}>
      {children}
    </Link>
  );
};

export default CustomLink;
