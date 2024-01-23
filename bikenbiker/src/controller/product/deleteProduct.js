import { Product } from "../../model/productModel.js"; 

/**
 * deleteProduct
 * @param req
 * @param res
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const prodId = req.params.id ? req.params.id : null;
    // if (!prodId) throw StatusError.badRequest("Task Id is required");
    const product = await Product.findById(prodId);
    if (!product) {
      throw new Error("Invalid Id");
    }

    product.status = "deleted";
    const updatedProduct = await product.save();

    return res.status(200).json({
      message: "Deleted successfully",
      deletedProduct: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
