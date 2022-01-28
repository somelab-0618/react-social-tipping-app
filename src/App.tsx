import React from 'react';
import logo from './assets/img/logo.svg';
import './assets/css/App.css';
import { Router } from './router/Router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Social Tipping App</h1>
        </header>
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
