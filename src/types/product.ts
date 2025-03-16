export interface Product {
    id: number;
    title: string;
    price: number;
    brand: string;
    description: string;
    isNew: boolean;
    image: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
    total: number;
}