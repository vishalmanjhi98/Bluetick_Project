import React from 'react';
import JobBoard from '../src/Components/JobBoard';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
        <Navbar/>
      <JobBoard />
      <Footer/>
    </div>
  );
}

export default App;
