// src/components/Layout/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Badge, IconButton, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import styles from '@/src/components/styles/Header.module.scss';

const Header: React.FC = () => {
    const { cart } = useCart();
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AppBar position="static" className={styles.header}>
            <Toolbar>
                <Link href="/" passHref>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
                        E-Shop
                    </Typography>
                </Link>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ mr: 2 }}>
                        Total: ${cart.total.toFixed(2)}
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={totalItems} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;