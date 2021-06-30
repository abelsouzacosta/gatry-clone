import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  // estado inicial da aplicação -> false
  const [display, setDisplay] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setDisplay((display) => !display)}>
          Mostrar
        </button>
        {display && <img src={logo} className="App-logo" alt="logo" />}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
