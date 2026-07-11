import { useContext } from 'react';
import { BundleContext } from '../context/BundleContext';

export const useBundle = () => {
  const context = useContext(BundleContext);
  if (context === undefined) {
    throw new Error('useBundle must be used within a BundleProvider');
  }
  return context;
};
