import React from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import './App.css';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="App w-screen h-screen flex flex-col">
      <Navbar />
      <div className="section">
        <About />
      </div>
      <div className="section active">
        <h1 className="w-full h-screen">Section 2</h1>
      </div>
    </div>
  );
}

export default App;
