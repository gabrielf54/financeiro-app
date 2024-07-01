import React from "react";

import Navbar from "../components/navbar";
import ProvedorAutenticacao from "./provedorAutenticacao";
import Rotas from "./rotas";

import "toastr/build/toastr.min";

import "bootswatch/dist/flatly/bootstrap.css";
import "toastr/build/toastr.css";
import "../custom.css";

import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/nova-light/theme.css";

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
