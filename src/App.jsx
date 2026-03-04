// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';  // ← Import karo

import './App.css';

function App() {
    return (
        <ShopProvider>
            <BrowserRouter>
                <div className="app">
                    <Navbar />
                    <main className="main">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/add-product" element={<AddProduct />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/orders" element={<Orders />} />
                            
                            {/* 404 Catch-All Route - Last mein rakho */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </ShopProvider>
    );
}

export default App;