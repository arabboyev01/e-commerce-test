import React, { ReactNode } from 'react';
import { Container, Grid, Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from '@/src/components/styles/Layout.module.scss';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box className={styles.layout}>
            <Header />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <Sidebar />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <main>{children}</main>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Layout;