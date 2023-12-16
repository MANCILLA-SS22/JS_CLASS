import { Router } from "express";
import productsDao from "../daos/dbManager/product.dao.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await productsDao.getAllProducts();
  res.render("index15", {
    products,
  });
});

export default router;