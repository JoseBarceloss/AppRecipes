import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './Pages/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="*" element={ <h1>Not Found</h1> } />
      </Routes>
    </div>
  );
}

export default App;
