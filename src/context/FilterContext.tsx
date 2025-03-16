// src/context/FilterContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types/product';

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

interface FilterState {
    priceRange: {
        min: number;
        max: number;
    };
    showOnlyNew: boolean;
    sortBy: SortOption;
    search: string;
}

interface FilterContextType {
    filters: FilterState;
    updatePriceRange: (min: number, max: number) => void;
    toggleShowOnlyNew: () => void;
    setSortOption: (option: SortOption) => void;
    setSearchQuery: (query: string) => void;
    filterProducts: (products: Product[]) => Product[];
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [filters, setFilters] = useState<FilterState>({
        priceRange: {
            min: 0,
            max: 5000,
        },
        showOnlyNew: false,
        sortBy: 'name-asc',
        search: '',
    });

    const updatePriceRange = (min: number, max: number) => {
        setFilters(prev => ({
            ...prev,
            priceRange: { min, max },
        }));
    };

    const toggleShowOnlyNew = () => {
        setFilters(prev => ({
            ...prev,
            showOnlyNew: !prev.showOnlyNew,
        }));
    };

    const setSortOption = (option: SortOption) => {
        setFilters(prev => ({
            ...prev,
            sortBy: option,
        }));
    };

    const setSearchQuery = (query: string) => {
        setFilters(prev => ({
            ...prev,
            search: query,
        }));
    };

    const filterProducts = (products: Product[]) => {
        // First apply filters
        const filtered = products.filter(product => {
            const matchesPrice =
                product.price >= filters.priceRange.min &&
                product.price <= filters.priceRange.max;

            const matchesNew = filters.showOnlyNew ? product.isNew : true;

            const matchesSearch = filters.search
                ? product.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                product.brand.toLowerCase().includes(filters.search.toLowerCase())
                : true;

            return matchesPrice && matchesNew && matchesSearch;
        });

        // Then sort
        const sortedProducts = [...filtered].sort((a, b) => {
            switch (filters.sortBy) {
                case 'name-asc':
                    return a.title.localeCompare(b.title);
                case 'name-desc':
                    return b.title.localeCompare(a.title);
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                default:
                    return 0;
            }
        });

        return sortedProducts;
    };

    return (
        <FilterContext.Provider
            value={{
                filters,
                updatePriceRange,
                toggleShowOnlyNew,
                setSortOption,
                setSearchQuery,
                filterProducts,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
};