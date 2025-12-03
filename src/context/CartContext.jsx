import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    setTotalQuantity(cart.reduce((acc, product) => acc + product.quantity, 0));
  }, [cart]);

  const addCartProduct = (newProduct) => {
    const productExist = cart.some((product) => product.id === newProduct.id);

    if (productExist) {
      setCart(
        cart.map((product) => {
          if (product.id === newProduct.id) {
            product.quantity = product.quantity + newProduct.quantity;
            return product;
          }

          return product;
        })
      );
      return;
    }
    setCart([...cart, newProduct]);
  };

  const deleteCartProduct = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  function deleteAllCartProducts() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        totalQuantity,
        addCartProduct,
        deleteCartProduct,
        deleteAllCartProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
