// src/pages/NotFound.jsx

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NotFound = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(10);

    // Auto redirect after 10 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    navigate('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="not-found-page">
            <div className="not-found-container">
                
                {/* Animated 404 */}
                <div className="error-code">
                    <span className="four">4</span>
                    <span className="zero">
                        <div className="zero-face">
                            <div className="eye left"></div>
                            <div className="eye right"></div>
                            <div className="mouth"></div>
                        </div>
                    </span>
                    <span className="four">4</span>
                </div>

                {/* Message */}
                <h1 className="error-title">Oops! Page Not Found</h1>
                <p className="error-subtitle">
                    Ho gaya confusion! Yeh page exist nahi karta 🤔
                </p>

                {/* Fun Messages */}
                <div className="error-messages">
                    <p>🔍 Shayad galat link pe click kar diya</p>
                    <p>📄 Ya phir yeh page delete ho gaya</p>
                    <p>🌐 Ya server ko pata nahi ye page kahan hai</p>
                </div>

                {/* Search Suggestions */}
                <div className="suggestions">
                    <h3>🎯 Yahan jaa sakte ho:</h3>
                    <div className="suggestion-links">
                        <Link to="/" className="suggestion-btn">
                            🏠 Home Page
                        </Link>
                        <Link to="/add-product" className="suggestion-btn">
                            ➕ Add Product
                        </Link>
                        <Link to="/cart" className="suggestion-btn">
                            🛒 Shopping Cart
                        </Link>
                        <Link to="/orders" className="suggestion-btn">
                            📦 My Orders
                        </Link>
                    </div>
                </div>

                {/* Auto Redirect Info */}
                <div className="auto-redirect">
                    <p>
                        🔄 Auto redirect in <strong>{countdown}</strong> seconds...
                    </p>
                    <button 
                        className="btn primary"
                        onClick={() => navigate('/')}
                    >
                        Take Me Home Now
                    </button>
                </div>

                {/* Fun Animation */}
                <div className="floating-icons">
                    <span className="float-icon" style={{animationDelay: '0s'}}>🛒</span>
                    <span className="float-icon" style={{animationDelay: '1s'}}>📦</span>
                    <span className="float-icon" style={{animationDelay: '2s'}}>🎁</span>
                    <span className="float-icon" style={{animationDelay: '3s'}}>🏷️</span>
                    <span className="float-icon" style={{animationDelay: '4s'}}>💳</span>
                </div>
            </div>
        </div>
    );
};

export default NotFound;