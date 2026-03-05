// src/context/ShopContext.jsx

import { createContext, useState, useEffect } from 'react';
id: crypto.randomUUID()

// Context banaya
export const ShopContext = createContext();

// Provider component
export const ShopProvider = ({ children }) => {
    
    // ========== PRODUCTS STATE ==========
    // Pehle localStorage check karo, agar nahi hai toh demo products use karo
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('products');
        if (saved) {
            return JSON.parse(saved);
        }
        // Demo products
        return [
            {
                id: '1',
                name: 'Wireless Headphones',
                price: 2999,
                description: 'Best quality wireless headphones with noise cancellation.',
                category: 'Electronics',
                brand: 'Sony',
                stock: 50,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'
            },
            {
                id: '2',
                name: 'Smart Watch',
                price: 4999,
                description: 'Smartwatch with heart rate monitor and GPS.',
                category: 'Electronics',
                brand: 'Samsung',
                stock: 30,
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'
            },
            {
                id: '3',
                name: 'Running Shoes',
                price: 3499,
                description: 'Comfortable shoes for running and gym.',
                category: 'Footwear',
                brand: 'Nike',
                stock: 100,
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300'
            },
            {
                id: '4',
                name: 'Laptop Bag',
                price: 1299,
                description: 'Stylish bag for laptop and office use.',
                category: 'Accessories',
                brand: 'Wildcraft',
                stock: 75,
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300'
            }
        ];
    });

    // ========== CART STATE ==========
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });

    // ========== ORDERS STATE ==========
    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('orders');
        return saved ? JSON.parse(saved) : [];
    });

    // ========== SEARCH STATE ==========
    const [searchText, setSearchText] = useState('');

    // ========== SAVE TO LOCALSTORAGE ==========
    // Jab bhi products change ho, save karo
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    // Jab bhi cart change ho, save karo
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Jab bhi orders change ho, save karo
    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    // ========== FILTERED PRODUCTS (Search ke liye) ==========
    const filteredProducts = products.filter(product => {
        const search = searchText.toLowerCase();
        return (
            product.name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search) ||
            product.brand.toLowerCase().includes(search)
        );
    });

    // ========== PRODUCT FUNCTIONS ==========
    
    // Naya product add karo
    const addProduct = (productData) => {
        const newProduct = {
            ...productData,
            id: uuidv4(),
            price: Number(productData.price),
            stock: Number(productData.stock)
        };
        setProducts([...products, newProduct]);
    };

    // Product delete karo
    const deleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    // Ek product find karo by ID
    const findProduct = (id) => {
        return products.find(p => p.id === id);
    };

    // ========== CART FUNCTIONS ==========
    
    // Cart mein add karo
    const addToCart = (product, qty = 1) => {
        // Check karo agar already hai cart mein
        const exists = cart.find(item => item.id === product.id);
        
        if (exists) {
            // Agar hai toh quantity badhao
            setCart(cart.map(item => 
                item.id === product.id 
                    ? { ...item, quantity: item.quantity + qty }
                    : item
            ));
        } else {
            // Nahi hai toh naya add karo
            setCart([...cart, { ...product, quantity: qty }]);
        }
    };

    // Cart se remove karo
    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    // Quantity update karo
    const updateCartQty = (id, newQty) => {
        if (newQty <= 0) {
            removeFromCart(id);
            return;
        }
        setCart(cart.map(item => 
            item.id === id ? { ...item, quantity: newQty } : item
        ));
    };

    // Cart khali karo
    const clearCart = () => {
        setCart([]);
    };

    // Cart ka total nikalo
    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Cart mein kitne items hain
    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    // ========== ORDER FUNCTIONS ==========
    
    // Order place karo
    const placeOrder = (paymentMethod) => {
        const newOrder = {
            id: Date.now().toString(),
            items: [...cart],
            total: getCartTotal(),
            date: new Date().toISOString(),
            paymentMethod: paymentMethod,
            status: 'Confirmed'
        };
        setOrders([newOrder, ...orders]);
        clearCart();
        return newOrder;
    };

    // ========== RETURN PROVIDER ==========
    return (
        <ShopContext.Provider value={{
            // Products
            products,
            filteredProducts,
            searchText,
            setSearchText,
            addProduct,
            deleteProduct,
            findProduct,
            
            // Cart
            cart,
            addToCart,
            removeFromCart,
            updateCartQty,
            clearCart,
            getCartTotal,
            getCartCount,
            
            // Orders
            orders,
            placeOrder
        }}>
            {children}
        </ShopContext.Provider>
    );
};
