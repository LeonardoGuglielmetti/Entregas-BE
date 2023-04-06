import productModel from '../../models/product.model.js';

export default class mongoProducts {

    async getAll() {
        const products = await productModel.find().lean()
            .then(data => data)
            .catch(e => { Error: e });
        return products;
    };

    async getRandom(id) {
        const products = await productModel.findOne({ id })
            .then(data => data)
            .catch(e => { Error: e });
        return products;
    };

    async save(product) {
        const createData = await productModel.create(product)
            .then(data => data)
            .catch(e => { Error: e });
        return createData;
    };

    async deleteById(id) {
        const products = await productModel.findOneAndDelete({ id })
            .then(data => data)
            .catch(e => { Error: e });
        return products;
    };

    async updateById(id, data) {
        const products = await productModel.updateOne({ id }, data)
            .then(data => data)
            .catch(e => { Error: e });
        return products;
    };
};