import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductCard = ({ product }) => {
    const { addToCart, deleteProduct } = useContext(ShopContext);

    const handleAddToCart = () => {
        addToCart(product);
        alert(`✅ ${product.name} cart mein add ho gaya!`); // ← Changed
    };

    const handleDelete = () => {
        if (window.confirm(`❓ Delete "${product.name}"?`)) {
            deleteProduct(product.id);
            alert('🗑️ Product delete ho gaya!'); // ← Changed
        }
    };

    return (
        <div className="product-card">
            <div className="card-image">
                <img 
                    src={product.image} 
                    alt={product.name}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                />
                <div className="card-buttons">
                    <Link to={`/product/${product.id}`} className="btn-view">
                        👁️ View
                    </Link>
                    <button className="btn-cart" onClick={handleAddToCart}>
                        🛒 Add
                    </button>
                </div>
            </div>
            <div className="card-info">
                <span className="category">{product.category}</span>
                <h3 className="name">{product.name}</h3>
                <p className="brand">by {product.brand}</p>
                <div className="card-footer">
                    <span className="price">₹{product.price.toLocaleString()}</span>
                    <button className="btn-delete" onClick={handleDelete}>
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;