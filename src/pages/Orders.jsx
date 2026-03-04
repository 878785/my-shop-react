// src/pages/Orders.jsx

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaShoppingBag } from 'react-icons/fa';
import { ShopContext } from '../context/ShopContext';

const Orders = () => {
    // Context se orders lo
    const { orders } = useContext(ShopContext);

    // No orders
    if (orders.length === 0) {
        return (
            <div className="empty-orders">
                <FaBox className="empty-icon" />
                <h2>Koi order nahi hai</h2>
                <p>Abhi tak kuch order nahi kiya!</p>
                <Link to="/" className="btn primary">
                    <FaShoppingBag /> Shopping Karo
                </Link>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <h1>📦 My Orders</h1>

            <div className="orders-list">
                {orders.map(order => (
                    <div key={order.id} className="order-card">
                        
                        {/* Header */}
                        <div className="order-header">
                            <div>
                                <h3>Order #{order.id}</h3>
                                <span className="status">{order.status}</span>
                            </div>
                            <p className="date">
                                {new Date(order.date).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>

                        {/* Items */}
                        <div className="order-items">
                            {order.items.map(item => (
                                <div key={item.id} className="order-item">
                                    <img src={item.image} alt={item.name} />
                                    <div>
                                        <h4>{item.name}</h4>
                                        <p>Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                                    </div>
                                    <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="order-footer">
                            <span>Payment: {order.paymentMethod}</span>
                            <span className="total">Total: ₹{order.total.toLocaleString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;