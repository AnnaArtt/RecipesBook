import axios from "axios";
import queryString from "query-string";

const params = {
  app_id: "c31a3183",
  app_key: "9ea4d958f775d81e1166f17e0594475e",
};

export async function getRecipes(customerParams) {
  let newParams = {
    ...params,
    ...customerParams,
  };
  console.log(params);

  const url = `https://api.edamam.com/api/recipes/v2?type=public&${queryString.stringify(
    newParams,
    { skipEmptyString: true }
  )}`;

  const response = await axios.get(url);
  console.log(response);

  return response;
}

export async function getMoreRecipes(url) {
  const response = await axios.get(url);
  console.log(response);
  return response;
}

export async function getRecipesByUri(uri) {
  let newParams = {
    ...params,
    uri: uri,
  };

  console.log(newParams);
  const response = await axios.get(
    "https://api.edamam.com/api/recipes/v2/by-uri?type=public",
    {
      params: newParams,
    }
  );
  console.log(response);
  return response;
}
