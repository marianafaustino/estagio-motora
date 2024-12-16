import './App.css';
import Driver from './pages/Driver';
import Navbar from './components/Navbar';
import Travel from './pages/Travel';
import Vehicle from './pages/Vehicle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Vehicle/>} />
        <Route path='/motoristas' element={<Driver/>} />
        <Route path='/viagens' element={<Travel/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
