import React, { useState } from "react";
import appStyles from "./App.module.css";
import { Game } from "./components/Game";

export const App = () => {
  return (
    <div className={appStyles.container}>
      <Game />
    </div>
  );
};
