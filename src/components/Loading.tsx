import React from "react";
import LOADING from "../assets/images/loading.gif";

export const Loading = (props: any) => (
  <div
    className="load-container"
    style={props.isLoading ? { display: "block" } : { display: "none" }}
  >
    <img src={LOADING} alt="" />
  </div>
);
