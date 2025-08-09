import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  targetAudience: string;
  keyFeatures: string;
  pricing: string;
  competition: string;
  marketingGoals: string;
  timeline: string;
  score?: number;
  feedback?: any;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'active' | 'published';
}

interface AppContextType {
  products: Product[];
  currentProduct: Product | null;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  setCurrentProduct: (product: Product | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Smart Fitness Tracker',
      category: 'technology',
      description: 'Advanced fitness tracking with AI-powered insights',
      targetAudience: 'Health-conscious individuals aged 25-45',
      keyFeatures: 'Heart rate monitoring, sleep tracking, workout analysis',
      pricing: 'subscription',
      competition: 'Fitbit, Apple Watch',
      marketingGoals: 'Increase brand awareness and user acquisition',
      timeline: '6 months',
      score: 87,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-17'),
      status: 'active'
    },
    {
      id: '2',
      name: 'Language Learning App',
      category: 'education',
      description: 'Interactive language learning with gamification',
      targetAudience: 'Students and professionals',
      keyFeatures: 'Interactive lessons, speech recognition, progress tracking',
      pricing: 'freemium',
      competition: 'Duolingo, Babbel',
      marketingGoals: 'Expand to new markets',
      timeline: '3 months',
      score: 92,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-12'),
      status: 'published'
    }
  ]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === id 
          ? { ...product, ...updates, updatedAt: new Date() }
          : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return (
    <AppContext.Provider value={{
      products,
      currentProduct,
      addProduct,
      updateProduct,
      deleteProduct,
      setCurrentProduct
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};