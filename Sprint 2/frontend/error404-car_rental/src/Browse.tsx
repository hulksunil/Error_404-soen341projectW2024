import React from "react";
import "./Browse.css";

export default function Browse() {
  function pageTitle() {
    return <title>This is the page title</title>;
  }

  return (
    <div>
      {pageTitle()}
      <h1> This is for browsing the cars</h1>
    </div>
  );
}
