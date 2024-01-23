import { Product } from "../../model/productModel.js"; 


/**
 * Product
 * @param req
 * @param res
 */
export const productList = async (req, res, next) => {
  try {
    const prods = await Product.find(
      {},
      {
        id: 1,
        product_name: 1,
        description: 1,
        status: 1,
        created_at: {
          $dateToString: { format: "%Y-%m-%d", date: "$created_at" },
        },
      }
    );

    return  res.status(200).json({
      data: prods,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
