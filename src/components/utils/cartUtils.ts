// src/utils/cartUtils.ts

import {CartItem} from "@/src/types/product";

/**
 * Save cart to localStorage
 */
export const saveCartToStorage = (items: CartItem[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(items));
    }
};

/**
 * Load cart from localStorage
 */
export const loadCartFromStorage = (): CartItem[] => {
    if (typeof window !== 'undefined') {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                return JSON.parse(storedCart);
            } catch (e) {
                console.error('Error parsing cart from storage', e);
            }
        }
    }
    return [];
};

/**
 * Calculate total price of items in cart
 */
export const calculateCartTotal = (items: CartItem[]): number => {
    return items.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
    }, 0);
};