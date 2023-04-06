import productModel from "../models/product.model.js";

const productsSave = async (req, res) => {
    const file = req.file;
    const { title, price, description, code, stock } = req.body;
    if (!title || !price || !description || !code || !stock ) return res.status(400).send({ status: "error", error: "Valores incompletos" });
    const product = {
        title,
        price,
        description,
        code,
        stock,
        image: `${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`
    };
    const result = await productModel.create(product);
    res.send({ status: "success", payload: result })
};

export default {
    productsSave
}