// src/pages/Cart.jsx

import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ShopContext } from '../context/ShopContext';
import CartItem from '../components/CartItem';

const Cart = () => {
    // Context se data lo
    const { cart, getCartTotal, clearCart } = useContext(ShopContext);
    
    // Navigation
    const navigate = useNavigate();

    // Calculations
    const subtotal = getCartTotal();
    const shipping = subtotal > 500 ? 0 : 50;  // 500+ pe free shipping
    const tax = Math.round(subtotal * 0.18);    // 18% GST
    const total = subtotal + shipping + tax;

    // Cart empty hai
    if (cart.length === 0) {
        return (
            <div className="empty-cart">
                <FaShoppingBag className="empty-icon" />
                <h2>Cart khali hai!</h2>
                <p>Kuch shopping karo pehle 🛍️</p>
                <Link to="/" className="btn primary">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            
            {/* Header */}
            <div className="cart-header">
                <button className="back-btn" onClick={() => navigate('/')}>
                    <FaArrowLeft /> Shopping Continue Karo
                </button>
                <h1>🛒 Shopping Cart</h1>
                <span className="cart-count">{cart.length} items</span>
            </div>

            <div className="cart-layout">
                
                {/* Cart Items */}
                <div className="cart-items">
                    {cart.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))}
                    
                    <button className="clear-btn" onClick={clearCart}>
                        <FaTrash /> Clear Cart
                    </button>
                </div>

                {/* Summary */}
                <div className="cart-summary">
                    <h2>Order Summary</h2>

                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString()}</span>
                    </div>

                    <div className="summary-row">
                        <span>Shipping</span>
                        <span className={shipping === 0 ? 'free' : ''}>
                            {shipping === 0 ? 'FREE' : `₹${shipping}`}
                        </span>
                    </div>

                    <div className="summary-row">
                        <span>Tax (18% GST)</span>
                        <span>₹{tax.toLocaleString()}</span>
                    </div>

                    {subtotal < 500 && (
                        <div className="shipping-msg">
                            💡 ₹{500 - subtotal} aur add karo free shipping ke liye!
                        </div>
                    )}

                    <div className="summary-total">
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                    </div>

                    <Link to="/checkout" className="btn primary full-width">
                        Checkout <FaArrowRight />
                    </Link>

                    <div className="payment-info">
                        <p>We Accept:</p>
                        <span>💳 Cards | 📱 UPI | 💵 COD</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;