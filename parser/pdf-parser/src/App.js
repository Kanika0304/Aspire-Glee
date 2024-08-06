import logo from './logo.svg';
import './App.css';
import React from 'react';
import FileUpload from'./components/FileUpload';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1> PDF Parser</h1>
        <FileUpload/>
      </header>
    </div>
  );
}

export default App;
