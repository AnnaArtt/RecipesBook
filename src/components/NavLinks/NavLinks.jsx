import React from "react";
import CustomLink from "../UI/CustomLink/CustomLink";

const NavLinks = () => {
  return (
    <div>
      <CustomLink to="/">Home</CustomLink>
      <CustomLink to="/recipes">My Recipes</CustomLink>
      <CustomLink to="/create">Create Recipe</CustomLink>
    </div>
  );
};

export default NavLinks;
