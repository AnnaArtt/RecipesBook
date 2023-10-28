import React, { useEffect } from "react";
import FirstView from "../../components/FirstView/FirstView";
import SearchDish from "../../components/SearchDish/SearchDish";
import ListRecipeDish from "../../components/ListRecipeDish/ListRecipeDish";

const MainPage = () => {
  return (
    <main>
      <FirstView />
      <SearchDish />
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ListRecipeDish />
      </div>
    </main>
  );
};

export default MainPage;
