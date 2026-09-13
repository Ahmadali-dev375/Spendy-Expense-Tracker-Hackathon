'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

type Currency = string;

interface SettingsContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  isSettingsLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<Currency>('USD');
  const [isSettingsLoading, setIsSettingsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedCurrency = localStorage.getItem('spendy-currency');
      if (storedCurrency) {
        setCurrencyState(storedCurrency);
      }
    } catch (error) {
      console.error("Could not read from localStorage", error);
    } finally {
      setIsSettingsLoading(false);
    }
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    try {
      localStorage.setItem('spendy-currency', newCurrency);
    } catch (error) {
      console.error("Could not write to localStorage", error);
    }
  };

  const contextValue = useMemo(() => ({
    currency,
    setCurrency,
    isSettingsLoading,
  }), [currency, isSettingsLoading]);

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
