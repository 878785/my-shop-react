// src/components/Navbar.jsx

import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaShoppingCart, FaSearch, FaList } from 'react-icons/fa';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    // Context se data lo
    const { setSearchText, getCartCount } = useContext(ShopContext);
    
    // Local state for search input
    const [search, setSearch] = useState('');
    
    // Navigation ke liye
    const navigate = useNavigate();

    // Search handle karo
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchText(search);
        navigate('/'); // Home pe jao
    };

    // Input change pe bhi search karo
    const handleInputChange = (e) => {
        setSearch(e.target.value);
        setSearchText(e.target.value);
    };

    return (
        <nav className="navbar">
            <div className="nav-content">
                
                {/* Logo */}
                <Link to="/" className="logo">
                    🛒 MyShop
                </Link>

                {/* Search Bar */}
                <form className="search-box" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={handleInputChange}
                    />
                    <button type="submit">
                        <FaSearch />
                    </button>
                </form>

                {/* Nav Links */}
                <div className="nav-links">
                    <Link to="/" className="nav-link">
                        <FaHome />
                        <span>Home</span>
                    </Link>

                    <Link to="/add-product" className="nav-link highlight">
                        <FaPlus />
                        <span>Add</span>
                    </Link>

                    <Link to="/orders" className="nav-link">
                        <FaList />
                        <span>Orders</span>
                    </Link>

                    <Link to="/cart" className="nav-link cart-icon">
                        <FaShoppingCart />
                        <span>Cart</span>
                        {getCartCount() > 0 && (
                            <span className="badge">{getCartCount()}</span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;