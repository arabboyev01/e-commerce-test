import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Link from 'next/link';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import styles from '@/src/components/styles/ProductCard.module.scss';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();

    const cartItem = cart.items.find(item => item.product.id === product.id);
    const isInCart = !!cartItem;

    return (
        <Card className={styles.productCard}>
            <Link href={`/products/${product.id}`} passHref>
                <CardMedia
                    component="img"
                    height="140"
                    image={product.image || "/images/placeholder.png"}
                    alt={product.title}
                    sx={{ cursor: 'pointer' }}
                />
            </Link>

            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                        <Typography variant="h6" component="div">
                            {product.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.brand}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                            ${product.price}
                        </Typography>
                    </Box>

                    {product.isNew && (
                        <Box
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                borderRadius: '4px',
                                padding: '4px 8px',
                                fontSize: '0.75rem',
                            }}
                        >
                            NEW
                        </Box>
                    )}
                </Box>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    {!isInCart ? (
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => addToCart(product)}
                        >
                            Add to Cart
                        </Button>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                            <IconButton
                                size="small"
                                onClick={() => decreaseQuantity(product.id)}
                                color="primary"
                            >
                                <RemoveIcon />
                            </IconButton>

                            <Typography variant="body1">
                                {cartItem?.quantity}
                            </Typography>

                            <IconButton
                                size="small"
                                onClick={() => increaseQuantity(product.id)}
                                color="primary"
                            >
                                <AddIcon />
                            </IconButton>
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;