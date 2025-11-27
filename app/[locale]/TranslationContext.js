'use client';
import { createContext, useContext } from 'react';

const TranslationContext = createContext({});

export const TranslationProvider = ({ dict, children }) => {
    return (
        <TranslationContext.Provider value={dict}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => useContext(TranslationContext);
