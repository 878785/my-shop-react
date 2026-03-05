// src/pages/ProductDetail.jsx

import { useContext, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart, FaMinus, FaPlus, FaTrash, FaBolt } from 'react-icons/fa';
import { ShopContext } from '../context/ShopContext';

const ProductDetail = () => {
    // URL se product ID lo
    const { id } = useParams();
    
    // Navigation
    const navigate = useNavigate();
    
    // Context se data lo
    const { findProduct, addToCart, deleteProduct } = useContext(ShopContext);
    
    // Quantity state
    const [qty, setQty] = useState(1);

    // Product dhundo
    const product = findProduct(id);

    // Agar product nahi mila
    if (!product) {
        return (
            <div className="not-found">
                <h2>😕 Product nahi mila!</h2>
                <p>Ye product exist nahi karta.</p>
                <Link to="/" className="btn primary">
                    <FaArrowLeft /> Home jao
                </Link>
            </div>
        );
    }

    // Add to cart
    const handleAddToCart = () => {
        addToCart(product, qty);
        alert(`${qty} × ${product.name} cart mein add ho gaya!`);
    };

    // Buy now
    const handleBuyNow = () => {
        addToCart(product, qty);
        navigate('/cart');
    };

    // Delete product
    const handleDelete = () => {
        if (window.confirm('Kya aap sure ho delete karna hai?')) {
            deleteProduct(id);
            navigate('/');
        }
    };

    return (
        <div className="product-detail-page">
            
            {/* Back Button */}
            <button className="back-btn" onClick={() => navigate(-1)}>
                <FaArrowLeft /> Back
            </button>

            <div className="detail-container">
                
                {/* Image */}
                <div className="detail-image">
                    <img src={product.image} alt={product.name} />
                </div>

                {/* Info */}
                <div className="detail-info">
                    <span className="detail-category">{product.category}</span>
                    <h1>{product.name}</h1>
                    <p className="detail-brand">Brand: <strong>{product.brand}</strong></p>
                    
                    <div className="detail-price">
                        ₹{product.price.toLocaleString()}
                    </div>

                    <p className="detail-desc">{product.description}</p>

                    {/* Stock Status */}
                    <div className="stock-status">
                        {product.stock > 0 ? (
                            <span className="in-stock">✅ In Stock ({product.stock} available)</span>
                        ) : (
                            <span className="out-stock">❌ Out of Stock</span>
                        )}
                    </div>

                    {/* Quantity */}
                    {product.stock > 0 && (
                        <div className="quantity-box">
                            <span>Quantity:</span>
                            <div className="qty-controls">
                                <button onClick={() => qty > 1 && setQty(qty - 1)}>
                                    <FaMinus />
                                </button>
                                <span>{qty}</span>
                                <button onClick={() => qty < product.stock && setQty(qty + 1)}>
                                    <FaPlus />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="detail-buttons">
                        <button 
                            className="btn primary"
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                        >
                            <FaShoppingCart /> Add to Cart
                        </button>
                        
                        <button 
                            className="btn success"
                            onClick={handleBuyNow}
                            disabled={product.stock === 0}
                        >
                            <FaBolt /> Buy Now
                        </button>
                        
                        <button className="btn danger" onClick={handleDelete}>
                            <FaTrash /> Delete
                        </button>
                    </div>

                    {/* Details Table */}
                    <div className="detail-table">
                        <h3>📋 Product Details</h3>
                        <table>
                            <tbody>
                                <tr><td>Name</td><td>{product.name}</td></tr>
                                <tr><td>Brand</td><td>{product.brand}</td></tr>
                                <tr><td>Category</td><td>{product.category}</td></tr>
                                <tr><td>Price</td><td>₹{product.price.toLocaleString()}</td></tr>
                                <tr><td>Stock</td><td>{product.stock} units</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
