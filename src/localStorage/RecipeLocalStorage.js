export function getLocalStoreItem(title) {
  return localStorage.getItem(title);
}

export function addRecipesUri(uri) {
  let recipes = getLocalStoreItem("recipesLike");

  if (recipes !== null) {
    recipes = recipes.split(",");
    recipes.push(uri);
    localStorage.setItem("recipesLike", recipes);
    return;
  }
  localStorage.setItem("recipesLike", uri);
}

export function removeRecipesUri(uri) {
  let recipes = getLocalStoreItem("recipesLike");
  recipes = recipes.split(",");
  recipes = recipes.filter((item) => item !== uri);

  localStorage.setItem("recipesLike", recipes);
}
