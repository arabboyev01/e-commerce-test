import { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Layout from '../components/Layout/Layout';
import ProductList from '../components/Product/ProductList';
import { Product } from '../types/product';
import Head from 'next/head';

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('/data/products.json');
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return (
        <>
            <Head>
                <title>E-Shop - Browse Products</title>
            </Head>
            <Layout>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <ProductList products={products} />
                )}
            </Layout>
        </>
    );
}
