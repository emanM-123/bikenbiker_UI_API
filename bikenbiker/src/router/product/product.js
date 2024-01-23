import { Router } from "express";
import { productRouter } from "../../controller/index.js";



const v1ProdRouter = Router();

v1ProdRouter.post(
  "/add",
  productRouter.addProduct
);

v1ProdRouter.post(
  "/update",
  productRouter.productupdate
);

v1ProdRouter.get(
  "/",
  productRouter.productList
);

v1ProdRouter.delete(
  "/delete/:id",
  productRouter.deleteProduct
);

export { v1ProdRouter };
