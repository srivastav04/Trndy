/*

It's all getting confused so i write the controllers here
*/

import express from "express";
import Product from "./model.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Product service is running");
});

router.get("/products", async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;
  const category = req.query.category;

  const filter = {};
  if (category) filter.category = category;

  try {
    const [products, total] = await Promise.all([
      Product.find(filter)
        .skip((page - 1) * limit)
        .limit(limit),
      Product.countDocuments(filter),
    ]);

    res.status(200).json({
      products,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/bulk", async (req, res) => {
  const idsParam = req.query.ids; // e.g., ?ids=id1,id2,id3

  if (!idsParam) {
    return res.json([]);
  }

  const ids = idsParam
    .split(",")
    .map((id) => id.trim())
    .filter((id) => mongoose.Types.ObjectId.isValid(id));

  if (ids.length === 0) {
    return res.status(400).json({ message: "No valid product IDs provided" });
  }

  try {
    const products = await Product.find({ _id: { $in: ids } });
    return res.json(products);
  } catch (err) {
    console.error("Failed to fetch bulk products:", err);
    return res.status(500).json({ message: "Server Error" });
  }
});

// in your Routes.js (Express)
router.get("/searchproducts", async (req, res) => {
  const q = (req.query.query || "").trim();
  if (!q) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    // case-insensitive regex on name or tagline
    const regex = new RegExp(q, "i");
    const products = await Product.find({
      $or: [{ name: regex }, { tagline: regex }],
    })
      .limit(10) // only top 10 suggestions
      .select("name images") // only fields you need
      .lean();

    return res.json({ products });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
