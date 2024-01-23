import { Router } from "express";
import { v1ProdRouter } from "./product.js";

const productRouter = Router();

productRouter.use("/product", v1ProdRouter);


export { productRouter };
