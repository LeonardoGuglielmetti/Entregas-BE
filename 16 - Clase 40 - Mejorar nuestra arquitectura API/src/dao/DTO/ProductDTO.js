export default class ProductDTO {

    static getInsertDTO = (product) => {
        return {
            title: product.title || 'Sin tituto',
            price: product.price,
            description: product.description || 'Sin descripcion',
            code: product.code,
            stock: product.stock,
            image: product.image || 'https://th.bing.com/th/id/OIP.IdEkpEihRxWNoUhTLSqJYQHaGS?pid=ImgDet&rs=1',
        };
    };

    static getPresenterDTO = (product) => {
        return {
            title: product.title,
            price: product.price,
            description: product.description,
            stock: product.stock > 0,
            image: product.image,
        };
    };
};