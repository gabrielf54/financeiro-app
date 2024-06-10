import React from "react";
import "./App.css";
import "bootswatch/dist/flatly/bootstrap.css";
import Login from './views/login'

class App extends React.Component {
  render() {
    return (
      <div>
        <Login />
      </div>
    );
  }
}

export default App;
