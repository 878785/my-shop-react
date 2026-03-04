// src/components/CartItem.jsx

import { useContext } from 'react';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const CartItem = ({ item }) => {
    // Context se functions lo
    const { removeFromCart, updateCartQty } = useContext(ShopContext);

    // Remove button click
    const handleRemove = () => {
        removeFromCart(item.id);
        toast.info(`${item.name} cart se remove ho gaya`);
    };

    // Quantity decrease
    const decreaseQty = () => {
        updateCartQty(item.id, item.quantity - 1);
    };

    // Quantity increase
    const increaseQty = () => {
        if (item.quantity < item.stock) {
            updateCartQty(item.id, item.quantity + 1);
        } else {
            toast.warning('Stock limit reach ho gayi!');
        }
    };

    // Item total calculate
    const itemTotal = item.price * item.quantity;

    return (
        <div className="cart-item">
            {/* Image */}
            <img 
                src={item.image} 
                alt={item.name}
                className="item-image"
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/70x70?text=No+Image';
                }}
            />

            {/* Details */}
            <div className="item-details">
                <h4>{item.name}</h4>
                <p className="item-brand">{item.brand}</p>
                <p className="item-price">₹{item.price.toLocaleString()}</p>
            </div>

            {/* Quantity */}
            <div className="item-quantity">
                <button onClick={decreaseQty}>
                    <FaMinus />
                </button>
                <span>{item.quantity}</span>
                <button onClick={increaseQty}>
                    <FaPlus />
                </button>
            </div>

            {/* Total */}
            <div className="item-total">
                ₹{itemTotal.toLocaleString()}
            </div>

            {/* Remove */}
            <button className="item-remove" onClick={handleRemove}>
                <FaTrash />
            </button>
        </div>
    );
};

export default CartItem;