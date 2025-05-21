/*

I was lazy to create a new file for controllers, So I continued it here

*/

import express from "express";
import Cart from "./model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Cart service is running");
});

router.get("/cart/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(200).json(null);
    }
    return res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.post("/cart/:userId", async (req, res) => {
  const { userId } = req.params;
  const { products } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products });
    } else {
      for (const newProduct of products) {
        const existingProduct = cart.products.find(
          (p) => p.productId === newProduct.productId
        );
        if (existingProduct) {
          existingProduct.quantity += newProduct.quantity;
        } else {
          cart.products.push(newProduct);
        }
      }
    }

    await cart.save();

    return res
      .status(cart.isNew ? 201 : 200)
      .json({ message: "Cart saved successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.put("/cart/:userId/item", async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.products.findIndex((p) => p.productId === productId);

    if (itemIndex > -1) {
      if (quantity > 0) {
        cart.products[itemIndex].quantity = quantity;
      } else {
        // Remove item if quantity is zero or less
        cart.products.splice(itemIndex, 1);
      }
    } else if (quantity > 0) {
      // Add new item
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    return res.json({ message: "Cart updated", cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/cart/:userId/item/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter((p) => p.productId !== productId);

    await cart.save();
    return res.json({ message: "Item removed", cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

export default router;
