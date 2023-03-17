import './App.css';
import React from 'react';

import { 

  BrowserRouter as Router,
  Navigate,
  Route,
  Routes

 } from 'react-router-dom';





import Timer from '../Subtemplates/Timer';




function App() {

  return (
    
    <Router>

      <Routes>

        <Route path='/timer' element={<Timer />} />

      </Routes>

    </Router>

  );
  
}

export default App;
