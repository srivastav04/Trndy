/*

It's all getting confused so i write the controllers here

*/

import express from "express";
import dotenv from "dotenv";
import Order from "./model.js";
dotenv.config();
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Order service is running");
});

router.post("/placeorder", async (req, res) => {
  const { userId, items } = req.body;

  try {
    const user = await Order.findOne({ userId });
    if (user) {
      user.orders.push(items);

      await user.save();
      return res.json({ message: "Order placed successfully" });
    } else {
      const order = new Order({ userId, orders: [items] });
      await order.save();
      return res.json({ message: "Order placed successfully" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.get("/orders/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ userId });
    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }

    return res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

export default router;
