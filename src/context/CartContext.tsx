// src/context/CartContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Cart } from '../types/product';

interface CartContextType {
    cart: Cart;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Cart>({ items: [], total: 0 });

    // Calculate total whenever items change
    useEffect(() => {
        const total = cart.items.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        );
        setCart(prevCart => ({ ...prevCart, total }));
    }, [cart.items]);

    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.items.find(item => item.product.id === product.id);

            if (existingItem) {
                return {
                    ...prevCart,
                    items: prevCart.items.map(item =>
                        item.product.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            } else {
                return {
                    ...prevCart,
                    items: [...prevCart.items, { product, quantity: 1 }],
                };
            }
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(prevCart => ({
            ...prevCart,
            items: prevCart.items.filter(item => item.product.id !== productId),
        }));
    };

    const increaseQuantity = (productId: number) => {
        setCart(prevCart => ({
            ...prevCart,
            items: prevCart.items.map(item =>
                item.product.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ),
        }));
    };

    const decreaseQuantity = (productId: number) => {
        setCart(prevCart => {
            const existingItem = prevCart.items.find(item => item.product.id === productId);

            if (existingItem && existingItem.quantity === 1) {
                return {
                    ...prevCart,
                    items: prevCart.items.filter(item => item.product.id !== productId),
                };
            }

            return {
                ...prevCart,
                items: prevCart.items.map(item =>
                    item.product.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ),
            };
        });
    };

    const clearCart = () => {
        setCart({ items: [], total: 0 });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};