import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CartProvider } from '../context/CartContext';
import { FilterProvider } from '../context/FilterContext';
import '@/src/components/styles/globals.scss';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <CartProvider>
                <FilterProvider>
                    <Component {...pageProps} />
                </FilterProvider>
            </CartProvider>
        </ThemeProvider>
    );
}

export default MyApp;