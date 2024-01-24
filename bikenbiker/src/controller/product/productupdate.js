import { Product } from "../../model/productModel.js"; 


/**
 * Update Product
 * @param req
 * @param res
 * @param next
 */
export const productupdate = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const prodId = req.params.id ? req.params.id : null;

    if (!prodId) {
      throw new Error("Product Id is required");
    }
    const updatedData = await Product.findByIdAndUpdate(prodId, {
      product_name: reqBody.product_name || "",
      description: reqBody.description || "",
      status: "active"
    }, { new: true });

    if (!updatedData) {
      throw new Error("Invalid ID");
    }

    return res.status(200).json({
      message: "updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
