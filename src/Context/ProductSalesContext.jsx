import { createContext, useState, useEffect, useContext } from "react";

const ProductSalesContext = createContext();

export const ProductSalesProvider = ({ children }) => {
  const [productSales, setProductSales] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("productSales")) || [];
    setProductSales(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("productSales", JSON.stringify(productSales));
  }, [productSales]);

  const updateSale = (newItem) => {
    setProductSales((prev) => {
      const index = prev.findIndex(
        (item) =>
          item.id === newItem.id 
      );

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], ...newItem };
        return updated;
      } else {
        return [...prev, newItem];
      }
    });
  };

  const toggleSale = (newItem) => {
    setProductSales((prev) => {
      const exists = prev.some(
        (item) =>
          item.id === newItem.id 
      );

      if (exists) {
        return prev.filter(
          (item) =>
            !(
              item.id === newItem.id 
            )
        );
      } else {
        return [...prev, newItem];
      }
    });
  };

  const deleteSale = (targetItem) => {
    setProductSales((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === targetItem.id 
          )
      )
    );
  };

  const isSold = (id) =>
    productSales.some(
      (item) => item.id === id 
    );

  return (
    <ProductSalesContext.Provider
      value={{ productSales, updateSale, deleteSale, toggleSale, isSold }}
    >
      {children}
    </ProductSalesContext.Provider>
  );
};

export const useProductSales = () => useContext(ProductSalesContext);
