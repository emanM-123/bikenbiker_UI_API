import { Product } from "../../model/productModel.js"; 

/**
 * addProduct
 * @param req
 * @param res
 */
export const addProduct = async (req, res, next) => {
  try {
    let reqBody = req.body;

    const data = {
      product_name: reqBody.product_name ? reqBody.product_name : "",
      description: reqBody.description ? reqBody.description : "",
      status: "active",
      created_at: reqBody.created_at ? new Date(reqBody.created_at) : new Date(),
    };

    const prod = new Product(data);

    const saved = await prod.save();

    if (saved) {
      return res.status(200).json({
        message: "createdSuccessfully",
        saved,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
