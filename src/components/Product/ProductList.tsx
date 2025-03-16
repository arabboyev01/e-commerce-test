import React from 'react';
import { Grid, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '../../types/product';
import { useFilter } from '../../context/FilterContext';
import styles from '@/src/components/styles/ProductList.module.scss';

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    const { filters, setSortOption, filterProducts } = useFilter();

    const filteredProducts = filterProducts(products);

    const handleSortChange = (event: SelectChangeEvent) => {
        setSortOption(event.target.value as any);
    };

    return (
        <Box className={styles.productList}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5">
                    Products ({filteredProducts.length})
                </Typography>

                <FormControl sx={{ minWidth: 200 }} size="small">
                    <InputLabel id="sort-select-label">Sort by</InputLabel>
                    <Select
                        labelId="sort-select-label"
                        id="sort-select"
                        value={filters.sortBy}
                        label="Sort by"
                        onChange={handleSortChange}
                    >
                        <MenuItem value="name-asc">Name (A-Z)</MenuItem>
                        <MenuItem value="name-desc">Name (Z-A)</MenuItem>
                        <MenuItem value="price-asc">Price (Low to High)</MenuItem>
                        <MenuItem value="price-desc">Price (High to Low)</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {filteredProducts.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
                    No products match your filters.
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {filteredProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default ProductList;
