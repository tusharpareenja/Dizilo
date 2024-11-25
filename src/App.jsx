import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Component from './Pages/Login';
import Home from './Pages/Home';
import Products from './Pages/Products';
import ProductPage from './Pages/ProductPage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Component />} />
        <Route path="/login" element={<Component />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:category" element={<Products />} />
        <Route path="/productpage" element={<ProductPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
