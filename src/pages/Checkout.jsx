// src/pages/Checkout.jsx

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Checkout = () => {
    const { cart, getCartTotal, placeOrder } = useContext(ShopContext);
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [orderDone, setOrderDone] = useState(false);
    const [orderId, setOrderId] = useState('');

    const [shipping, setShipping] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        pincode: ''
    });

    // ========== SHOP DETAILS ==========
    const SHOP_NAME = "MyShop";

    // Calculations
    const subtotal = getCartTotal();
    const shippingCost = subtotal > 500 ? 0 : 50;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shippingCost + tax;

    // ========== APNI QR CODE IMAGE ==========
    const getQRUrl = () => {
        return "/image.png";  // Public folder mein rakhi hui image
    };

    const handleChange = (e) => {
        setShipping({ ...shipping, [e.target.name]: e.target.value });
    };

    const goToPayment = () => {
        if (!shipping.name || !shipping.phone || !shipping.address || 
            !shipping.city || !shipping.pincode) {
            alert('⚠️ Please fill all details!');
            return;
        }
        setStep(2);
    };

    const confirmOrder = () => {
        if (!paymentMethod) {
            alert('⚠️ Select payment method!');
            return;
        }
        const order = placeOrder(paymentMethod);
        setOrderId(order.id);
        setOrderDone(true);
        alert('🎉 Order placed successfully!');
    };

    if (cart.length === 0 && !orderDone) {
        navigate('/cart');
        return null;
    }

    // Success Screen
    if (orderDone) {
        return (
            <div className="order-success">
                <div className="success-icon">✅</div>
                <h1>Order Successful! 🎉</h1>
                <p className="order-id">Order ID: <strong>#{orderId}</strong></p>
                <p>Thank you for shopping!</p>
                
                <div className="success-info">
                    <p><strong>Total Paid:</strong> ₹{total.toLocaleString()}</p>
                    <p><strong>Payment:</strong> {paymentMethod}</p>
                </div>

                <div className="success-buttons">
                    <button onClick={() => navigate('/')} className="btn primary">
                        Continue Shopping
                    </button>
                    <button onClick={() => navigate('/orders')} className="btn secondary">
                        View Orders
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <button className="back-btn" onClick={() => navigate('/cart')}>
                ← Back to Cart
            </button>

            {/* Progress */}
            <div className="progress-bar">
                <div className={`step ${step >= 1 ? 'active' : ''}`}>
                    <span>1</span> Shipping
                </div>
                <div className="line"></div>
                <div className={`step ${step >= 2 ? 'active' : ''}`}>
                    <span>2</span> Payment
                </div>
            </div>

            <div className="checkout-layout">
                <div className="checkout-form">
                    
                    {/* STEP 1: Shipping */}
                    {step === 1 && (
                        <div className="shipping-form">
                            <h2>📦 Shipping Details</h2>

                            <div className="field">
                                <label>Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={shipping.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="field-row">
                                <div className="field">
                                    <label>Phone *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={shipping.phone}
                                        onChange={handleChange}
                                        placeholder="10 digits"
                                    />
                                </div>
                                <div className="field">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={shipping.email}
                                        onChange={handleChange}
                                        placeholder="email@example.com"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label>Address *</label>
                                <textarea
                                    name="address"
                                    value={shipping.address}
                                    onChange={handleChange}
                                    placeholder="Full address"
                                    rows="3"
                                />
                            </div>

                            <div className="field-row">
                                <div className="field">
                                    <label>City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={shipping.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                    />
                                </div>
                                <div className="field">
                                    <label>PIN *</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={shipping.pincode}
                                        onChange={handleChange}
                                        placeholder="6 digits"
                                        maxLength="6"
                                    />
                                </div>
                            </div>

                            <button className="btn primary full-width" onClick={goToPayment}>
                                Continue to Payment →
                            </button>
                        </div>
                    )}

                    {/* STEP 2: Payment */}
                    {step === 2 && (
                        <div className="payment-form">
                            <h2>💳 Payment Method</h2>

                            <div className="payment-options">
                                <label className={`option ${paymentMethod === 'FamPay' ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        value="FamPay"
                                        checked={paymentMethod === 'FamPay'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <span className="option-icon">📱</span>
                                    <div>
                                        <strong>Pay via FamPay QR</strong>
                                        <small>Scan QR code to pay</small>
                                    </div>
                                </label>

                                <label className={`option ${paymentMethod === 'COD' ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        value="COD"
                                        checked={paymentMethod === 'COD'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <span className="option-icon">💵</span>
                                    <div>
                                        <strong>Cash on Delivery</strong>
                                        <small>Pay when delivered</small>
                                    </div>
                                </label>
                            </div>

                            {/* ========== FAMPAY QR CODE ========== */}
                            {paymentMethod === 'FamPay' && (
                                <div className="qr-section fampay-qr">
                                    <h3>📲 Scan to Pay via FamPay</h3>
                                    
                                    <div className="qr-box">
                                        <img 
                                            src={getQRUrl()} 
                                            alt="FamPay QR Code"
                                            className="qr-image"
                                        />
                                    </div>

                                    <div className="qr-info">
                                        <div className="amount-box">
                                            <p className="amount-label">Total Amount</p>
                                            <p className="amount-value">₹{total.toLocaleString()}</p>
                                        </div>

                                        <div className="payment-steps">
                                            <h4>📝 How to Pay:</h4>
                                            <ol>
                                                <li>Open <strong>FamPay</strong> app</li>
                                                <li>Tap on <strong>Scan QR</strong></li>
                                                <li>Scan this QR code</li>
                                                <li>Enter amount: <strong>₹{total}</strong></li>
                                                <li>Confirm payment</li>
                                            </ol>
                                        </div>

                                        <div className="payment-note">
                                            💡 Make sure to enter exact amount
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="payment-buttons">
                                <button className="btn secondary" onClick={() => setStep(1)}>
                                    ← Back
                                </button>
                                <button 
                                    className="btn primary"
                                    onClick={confirmOrder}
                                    disabled={!paymentMethod}
                                >
                                    {paymentMethod === 'FamPay' 
                                        ? '✓ Payment Done' 
                                        : '✓ Place Order'
                                    }
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Summary */}
                <div className="checkout-summary">
                    <h2>📋 Order Summary</h2>

                    <div className="summary-items">
                        {cart.map(item => (
                            <div key={item.id} className="summary-item">
                                <img src={item.image} alt={item.name} />
                                <div>
                                    <h4>{item.name}</h4>
                                    <p>Qty: {item.quantity}</p>
                                </div>
                                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    <div className="summary-totals">
                        <div className="row">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="row">
                            <span>Shipping</span>
                            <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                        </div>
                        <div className="row">
                            <span>Tax (18%)</span>
                            <span>₹{tax.toLocaleString()}</span>
                        </div>
                        <div className="row total">
                            <span>Total</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;