import mongoose from "mongoose";
import mongoosePagination from 'mongoose-paginate-v2'

const collection = 'Products';

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    },
});

productsSchema.plugin(mongoosePagination);

const productModel = mongoose.model(collection, productsSchema);

export default productModel;