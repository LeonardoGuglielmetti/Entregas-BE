import { productsService } from "../dao/index.js";

const createProduct = async (req, res) => {
    const file = req.file;
    const { title, price, description, code, stock } = req.body;
    if (!title || !price || !description || !code || !stock) return res.status(400).send({ status: "error", error: "Valores incompletos" });
    const product = {
        title,
        price,
        description,
        code,
        stock,
        image: `${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`
    };
    const result = await productsService.save(product);
    res.send({ status: "success", payload: result })
};

const getProducts = async (req, res) => {
    const products = await productsService.getall();
    res.send({ status: "success", payload: products })
}

export default {
    createProduct,
    getProducts
};