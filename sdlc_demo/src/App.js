import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';

//Components
//import Test1 from './components/test1';
import Columns from './components/Columns';

function App() {
  

  return (
    <div className="App" >
      <header >
        Gen AI Testing
        {/* 
        <img src={logo} className="App-logo" alt="logo" />
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
      */}
      </header>
      <div>
        <div><Columns/></div>
      </div>
    </div>
  );
}

export default App;
