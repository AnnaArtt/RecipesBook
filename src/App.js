import { Routes, Route } from "react-router-dom";
import "./App.scss";
import HeaderBlock from "./components/HeaderBlock/HeaderBlock";
import MainPage from "./pages/MainPage/MainPage";
import MyRecipes from "./pages/MyRecipes/MyRecipes";
import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";

function App() {
  return (
    <div className="App">
      <HeaderBlock />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/recipes" element={<MyRecipes />} />
        <Route path="/create" element={<CreateRecipe />} />
      </Routes>
    </div>
  );
}

export default App;
