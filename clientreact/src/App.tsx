import React from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';
import Xrouters from './components/router';

function App() {
  return (
    <HashRouter>
      <Xrouters />
    </HashRouter>
  );
}

export default App;
