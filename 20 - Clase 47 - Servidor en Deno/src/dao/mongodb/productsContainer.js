import productModel from './models/product.model.js';

export default class mongoProducts {

    getAll = (params, page = 1) => {
        const products = productModel.paginate(params, { page, limit: 6, lean: true })
        return products;
    };

    getRandom = (id) => {
        const products = productModel.findOne({ id })
        return products;
    };

    save = (product) => {
        const createData = productModel.create(product)
        return createData;
    };

    deleteById = (id) => {
        const products = productModel.findOneAndDelete({ id })
        return products;
    };

    updateById = (id, data) => {
        const products = productModel.updateOne({ id }, data)
        return products;
    };
};