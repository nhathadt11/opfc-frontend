import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainLayout from './containers/MainLayout';

const App = () => (
  <BrowserRouter>
    <MainLayout />
  </BrowserRouter>
);

export default App;
