import React from 'react';
import { Box, Typography, Button, Paper, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import styles from '@/src/components/styles/ProductDetails.module.scss';

interface ProductDetailsProps {
    product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();

    const cartItem = cart.items.find(item => item.product.id === product.id);
    const isInCart = !!cartItem;

    return (
        <Paper className={styles.productDetails}>
            <Link href="/" passHref>
                <Button
                    startIcon={<ArrowBackIcon />}
                    sx={{ mb: 3 }}
                    color="primary"
                >
                    Back to Products
                </Button>
            </Link>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                <Box sx={{ flex: '0 0 40%', maxWidth: { xs: '100%', md: '40%' } }}>
                    <img
                        src={product.image || "/images/placeholder.png"}
                        alt={product.title}
                        style={{ width: '100%', borderRadius: '8px' }}
                    />
                </Box>

                <Box sx={{ flex: '1 1 auto' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                            <Typography variant="h4" component="h1">
                                {product.title}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                                {product.brand}
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

                    <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
                        ${product.price}
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 4 }}>
                        {product.description}
                    </Typography>

                    <Box sx={{ maxWidth: '300px' }}>
                        {!isInCart ? (
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </Button>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, border: '1px solid', borderColor: 'primary.main', borderRadius: 1 }}>
                                <IconButton
                                    onClick={() => decreaseQuantity(product.id)}
                                    color="primary"
                                >
                                    <RemoveIcon />
                                </IconButton>

                                <Typography variant="h6">
                                    {cartItem?.quantity}
                                </Typography>

                                <IconButton
                                    onClick={() => increaseQuantity(product.id)}
                                    color="primary"
                                >
                                    <AddIcon />
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default ProductDetails;