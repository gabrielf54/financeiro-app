import React from "react";

import Navbar from "../components/navbar";
import ProvedorAutenticacao from "./provedor-autenticacao";
import Rotas from "./rotas";

import "bootswatch/dist/flatly/bootstrap.min.css";
import "toastr/build/toastr.min.css";
import "../custom.css";

import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";

class App extends React.Component {
  render() {
    return (
      <ProvedorAutenticacao>
        <Navbar />
        <div className="container">
          <Rotas />
        </div>
      </ProvedorAutenticacao>
    );
  }
}

export default App;
