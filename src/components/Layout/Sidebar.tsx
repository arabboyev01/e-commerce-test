import React from 'react';
import { Box, Typography, Slider, FormControlLabel, Switch, Paper } from '@mui/material';
import { useFilter } from '../../context/FilterContext';
import styles from '@/src/components/styles/Sidebar.module.scss';

const Sidebar: React.FC = () => {
    const { filters, updatePriceRange, toggleShowOnlyNew } = useFilter();

    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            updatePriceRange(newValue[0], newValue[1]);
        }
    };

    return (
        <Paper className={styles.sidebar}>
            <Typography variant="h6" gutterBottom>
                Filters
            </Typography>

            <Box sx={{ mt: 3 }}>
                <Typography id="price-range-slider" gutterBottom>
                    Price Range
                </Typography>
                <Slider
                    value={[filters.priceRange.min, filters.priceRange.max]}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={3000}
                    step={50}
                    aria-labelledby="price-range-slider"
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2">${filters.priceRange.min}</Typography>
                    <Typography variant="body2">${filters.priceRange.max}</Typography>
                </Box>
            </Box>

            <Box sx={{ mt: 3 }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={filters.showOnlyNew}
                            onChange={toggleShowOnlyNew}
                            name="showOnlyNew"
                            color="primary"
                        />
                    }
                    label="Show only new products"
                />
            </Box>
        </Paper>
    );
};

export default Sidebar;