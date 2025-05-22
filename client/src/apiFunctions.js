// src/apiFunctions.js
import axios from "axios";

const URL = import.meta.env.VITE_CART_URL;
export const userLogin = async (userName, password) => {
  const response = await axios.post(`${import.meta.env.VITE_AUTH_URL}/login`, {
    userName,
    password,
  });

  return response.data;
};
export const userSignUp = async (userName, password) => {
  const response = await axios.post(
    `${import.meta.env.VITE_AUTH_URL}/register`,
    {
      userName,
      password,
    }
  );
  return response.data;
};

export const getProducts = async (page = 1, limit = 12, category) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_PRODUCT_URL}/products`,
    {
      params: { page, limit, category },
    }
  );
  return data;
};

export const getProductById = async (id) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_PRODUCT_URL}/products/${id}`
  );
  return data;
};

export const addToCart = async (userId, products) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_CART_URL}/cart/${userId}`,
    {
      products,
    }
  );
  return data;
};

export const getCart = async (userId) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_CART_URL}/cart/${userId}`
  );
  return data;
};

export const getCartItems = async (userId) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_PRODUCT_URL}/bulk?ids=${userId}`
  );
  return data;
};

export const updateCartItem = async (userId, productId, quantity) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_CART_URL}/cart/${userId}/item`,
    {
      productId,
      quantity,
    }
  );
  return data;
};

// Remove a product from the cart entirely
export const removeCartItem = async (userId, productId) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_CART_URL}/cart/${userId}/item/${productId}`
  );
  return data;
};

export const searchproducts = async (query) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_PRODUCT_URL}/searchproducts`,
    {
      params: { query },
    }
  );
  return data.products;
};

export const placeorder = async ({ userId, items }) => {
  const date = new Date().toISOString().slice(0, 10);
  const itemswithdate = [items, date];
  const { data } = await axios.post(
    `${import.meta.env.VITE_ORDER_URL}/placeorder`,
    {
      userId,
      items: itemswithdate,
    }
  );
  return data;
};

export const getOrders = async (userId) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_ORDER_URL}/orders/${userId}`
  );
  return data;
};
