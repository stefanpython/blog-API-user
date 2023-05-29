import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  return <CartContext.Provider>{children}</CartContext.Provider>;
};
