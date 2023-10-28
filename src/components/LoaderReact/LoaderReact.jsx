import React from "react";
import { Triangle } from "react-loader-spinner";

const LoaderReact = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Triangle
        height="100"
        width="100"
        color="#ab1c56"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default LoaderReact;
