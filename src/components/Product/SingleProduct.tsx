import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, CircularProgress, Typography } from '@mui/material';
import Layout from '../../components/Layout/Layout';
import ProductDetails from '../../components/Product/ProductDetails';
import { Product } from '../../types/product';
import Head from 'next/head';

export default function ProductDetailPage() {
    const router = useRouter();
    const { id } = router.query;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProduct() {
            if (!id) return;

            try {
                setLoading(true);
                // Fetch all products and find the one with matching id
                const response = await fetch('/data/products.json');
                const data = await response.json();
                const foundProduct = data.products.find((p: Product) => p.id === Number(id));

                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    setError('Product not found');
                }
            } catch (error) {
                console.error('Failed to fetch product:', error);
                setError('Failed to load product');
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    return (
        <>
            <Head>
                <title>{product ? `${product.title} | E-Shop` : 'Product | E-Shop'}</title>
            </Head>
            <Layout>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <Typography variant="h5" color="error">
                            {error}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            The product you are looking for could not be found or has been removed.
                        </Typography>
                    </Box>
                ) : product ? (
                    <ProductDetails product={product} />
                ) : null}
            </Layout>
        </>
    );
}
