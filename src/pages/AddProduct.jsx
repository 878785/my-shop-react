// src/pages/AddProduct.jsx

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaTimes, FaImage } from 'react-icons/fa';
import { ShopContext } from '../context/ShopContext';


const AddProduct = () => {
    // Context se function lo
    const { addProduct } = useContext(ShopContext);
    
    // Navigation ke liye
    const navigate = useNavigate();

    // Form data state
    const [form, setForm] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        brand: '',
        stock: '',
        image: ''
    });

    // Image preview ke liye
    const [preview, setPreview] = useState('');

    // Categories list
    const categories = [
        'Electronics',
        'Clothing',
        'Footwear',
        'Accessories',
        'Home & Kitchen',
        'Books',
        'Sports',
        'Beauty',
        'Toys',
        'Other'
    ];

    // Input change handle karo
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Image file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // File ko base64 mein convert karo
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setForm({ ...form, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    // Image URL input
    const handleUrlInput = (e) => {
        const url = e.target.value;
        setForm({ ...form, image: url });
        setPreview(url);
    };

    // Form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!form.name || !form.price || !form.description || 
            !form.category || !form.brand || !form.stock || !form.image) {
            alert('Sab fields fill karo!');
            return;
        }

        // Product add karo
        addProduct(form);
        alert('🎉 Product add ho gaya!');
        navigate('/');
    };

    // Reset form
    const handleReset = () => {
        setForm({
            name: '',
            price: '',
            description: '',
            category: '',
            brand: '',
            stock: '',
            image: ''
        });
        setPreview('');
    };

    return (
        <div className="add-product-page">
            <div className="form-container">
                <h1>➕ Add New Product</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-layout">
                        
                        {/* Left Side - Image */}
                        <div className="image-section">
                            {/* Preview Box */}
                            <div className="preview-box">
                                {preview ? (
                                    <img src={preview} alt="Preview" />
                                ) : (
                                    <div className="placeholder">
                                        <FaImage />
                                        <p>Product Image</p>
                                    </div>
                                )}
                            </div>

                            {/* Upload Options */}
                            <div className="upload-options">
                                <label className="file-label">
                                    📁 Upload File
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                    />
                                </label>
                                
                                <span className="or">OR</span>
                                
                                <input
                                    type="url"
                                    placeholder="Image URL paste karo"
                                    onChange={handleUrlInput}
                                    className="url-input"
                                />
                            </div>
                        </div>

                        {/* Right Side - Form Fields */}
                        <div className="fields-section">
                            
                            {/* Name */}
                            <div className="field">
                                <label>Product Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Product ka naam"
                                />
                            </div>

                            {/* Price & Stock */}
                            <div className="field-row">
                                <div className="field">
                                    <label>Price (₹) *</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={form.price}
                                        onChange={handleChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                                <div className="field">
                                    <label>Stock *</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={form.stock}
                                        onChange={handleChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                            </div>

                            {/* Category & Brand */}
                            <div className="field-row">
                                <div className="field">
                                    <label>Category *</label>
                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                    >
                                        <option value="">-- Select --</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="field">
                                    <label>Brand *</label>
                                    <input
                                        type="text"
                                        name="brand"
                                        value={form.brand}
                                        onChange={handleChange}
                                        placeholder="Brand name"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="field">
                                <label>Description *</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Product ke baare mein likho..."
                                    rows="4"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="form-buttons">
                                <button type="button" className="btn secondary" onClick={handleReset}>
                                    <FaTimes /> Reset
                                </button>
                                <button type="submit" className="btn primary">
                                    <FaSave /> Save Product
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
