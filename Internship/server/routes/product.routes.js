import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/Product.Controller.js"
const ProductRouter = express.Router();

ProductRouter.post("/", createProduct);
ProductRouter.get("/", getProducts);
ProductRouter.get("/:id", getProductById);
ProductRouter.put("/:id", updateProduct);
ProductRouter.delete("/:id", deleteProduct);

export default ProductRouter;
