// CategoryContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Categories, Category } from './categories';

interface CategoryContextType {
  selectedCategory: Category;
  changeCategory: (category: Category) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(Categories.Programming);

  const changeCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  return (
    <CategoryContext.Provider value={{ selectedCategory, changeCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};
