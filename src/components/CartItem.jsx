import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const CartItem = ({ item }) => {
    const { removeFromCart, updateCartQty } = useContext(ShopContext);

    const handleRemove = () => {
        removeFromCart(item.id);
        alert(`🗑️ ${item.name} cart se remove ho gaya`); // ← Changed
    };

    const decreaseQty = () => {
        updateCartQty(item.id, item.quantity - 1);
    };

    const increaseQty = () => {
        if (item.quantity < item.stock) {
            updateCartQty(item.id, item.quantity + 1);
        } else {
            alert('⚠️ Stock limit reached!'); // ← Changed
        }
    };

    const itemTotal = item.price * item.quantity;

    return (
        <div className="cart-item">
            <img 
                src={item.image} 
                alt={item.name}
                className="item-image"
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/70x70?text=No+Image';
                }}
            />
            <div className="item-details">
                <h4>{item.name}</h4>
                <p className="item-brand">{item.brand}</p>
                <p className="item-price">₹{item.price.toLocaleString()}</p>
            </div>
            <div className="item-quantity">
                <button onClick={decreaseQty}>➖</button>
                <span>{item.quantity}</span>
                <button onClick={increaseQty}>➕</button>
            </div>
            <div className="item-total">₹{itemTotal.toLocaleString()}</div>
            <button className="item-remove" onClick={handleRemove}>
                🗑️
            </button>
        </div>
    );
};

export default CartItem;