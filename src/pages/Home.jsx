// src/pages/Home.jsx

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaBoxOpen } from 'react-icons/fa';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const Home = () => {
    // Context se data lo
    const { filteredProducts, searchText } = useContext(ShopContext);

    return (
        <div className="home-page">
            
            {/* Hero Section */}
            <div className="hero">
                <h1>🛍️ Welcome to MyShop</h1>
                <p>Best products at best prices!</p>
            </div>

            {/* Products Section */}
            <div className="products-section">
                
                {/* Header */}
                <div className="section-header">
                    <h2>
                        {searchText 
                            ? `Results for "${searchText}"` 
                            : '🔥 All Products'
                        }
                    </h2>
                    <span>{filteredProducts.length} products</span>
                </div>

                {/* Products Grid ya Empty Message */}
                {filteredProducts.length === 0 ? (
                    // Koi product nahi mila
                    <div className="empty-state">
                        <FaBoxOpen className="empty-icon" />
                        <h3>Koi product nahi mila</h3>
                        <p>Kuch aur search karo ya naya product add karo</p>
                        <Link to="/add-product" className="btn primary">
                            <FaPlus /> Add Product
                        </Link>
                    </div>
                ) : (
                    // Products grid
                    <div className="products-grid">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;