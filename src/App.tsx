import React from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import './App.css';


function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="App w-screen h-screen flex flex-col">
      <Navbar />
      <About />
    </div>
  );
}

export default App;
