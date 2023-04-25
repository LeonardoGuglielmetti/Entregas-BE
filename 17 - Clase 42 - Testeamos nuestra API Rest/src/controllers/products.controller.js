import { productsService } from "../dao/index.js";

const productsSave = async (req, res) => {
    try {
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
    } catch {
        res.status(500).send({ status: "error", error: "Error del servidor" })
    }
};

const getProducts = async(req,res) =>{
    const videogames = await productsService.getall();
    res.send({status:"success",payload:videogames})
}

export default {
    productsSave,
    getProducts
};