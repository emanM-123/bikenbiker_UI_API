import { Product } from "../../model/productModel.js"; 

/**
 * activeProduct
 * @param req
 * @param res
 */
export const activeProduct = async (req, res, next) => {
  try {
    const prodId = req.params.id ? req.params.id : null;
    if (!prodId) {
      throw new Error("Product Id is required");
    }
    const product = await Product.findById(prodId);
    if (!product) {
      throw new Error("Invalid Id");
    }

    product.status = "active";
    const updatedProduct = await product.save();

    return res.status(200).json({
      message: "Active successfully",
      deletedProduct: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
