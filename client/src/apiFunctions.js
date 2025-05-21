// src/apiFunctions.js
import axios from "axios";

export const userLogin = async (userName, password) => {
  const response = await axios.post("http://localhost:4003/login", {
    userName,
    password,
  });

  return response.data;
};
export const userSignUp = async (userName, password) => {
  const response = await axios.post("http://localhost:4003/register", {
    userName,
    password,
  });
  return response.data;
};

export const getProducts = async (page = 1, limit = 12, category) => {
  const { data } = await axios.get("http://localhost:4000/products", {
    params: { page, limit, category },
  });
  return data;
};

export const getProductById = async (id) => {
  const { data } = await axios.get(`http://localhost:4000/products/${id}`);
  return data;
};

export const addToCart = async (userId, products) => {
  const { data } = await axios.post(`http://localhost:4001/cart/${userId}`, {
    products,
  });
  return data;
};

export const getCart = async (userId) => {
  const { data } = await axios.get(`http://localhost:4001/cart/${userId}`);
  return data;
};

export const getCartItems = async (userId) => {
  const { data } = await axios.get(`http://localhost:4000/bulk?ids=${userId}`);
  // console.log("Bulk fetch data:", data);
  return data;
};

export const updateCartItem = async (userId, productId, quantity) => {
  const { data } = await axios.put(
    `http://localhost:4001/cart/${userId}/item`,
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
    `http://localhost:4001/cart/${userId}/item/${productId}`
  );
  return data;
};

export const searchproducts = async (query) => {
  const { data } = await axios.get(`http://localhost:4000/searchproducts`, {
    params: { query },
  });
  return data.products;
};

export const placeorder = async ({ userId, items }) => {
  const date = new Date().toISOString().slice(0, 10);
  const itemswithdate = [items, date];
  const { data } = await axios.post("http://localhost:4002/placeorder", {
    userId,
    items: itemswithdate,
  });
  return data;
};

export const getOrders = async (userId) => {
  const { data } = await axios.get(`http://localhost:4002/orders/${userId}`);
  return data;
};
