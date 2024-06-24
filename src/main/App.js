import React from "react";
import "../App.css";
import "bootswatch/dist/flatly/bootstrap.css";
import Rotas from "./rotas";
import "../custom.css";
import Navbar from "../components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Rotas />
      </div>
    </>
  );
}

export default App;
