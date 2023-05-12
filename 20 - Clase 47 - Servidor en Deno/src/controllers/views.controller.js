
import { cartsService, historiesService, productsService, usersService } from "../dao/index.js";

const productsGetAll = async (req, res) => {

    // el problema lo tengo con esto que no lee el .cart
    const page = req.query.page || 1;
    // const cartId = req.user.cart;
    const pagination = await productsService.getAll({}, page);
    let products = pagination.docs;
    // const cart = await cartsService.getCartById(cartId);
    // const user = await usersService.getBy({ _id: req.user._id });
    // products = products.map(product => {
    //     const existsInCart = cart.products.some(v => v._id.toString() === product._id.toString());
    //     const existsInLibrary = user.library.some(p = p._id.toString() === product._id.toString());
    //     return { ...product, inCart: existsInCart, inLibrary: existsInLibrary };
    // });
    const paginationData = {
        hasPrevPage: pagination.hasPrevPage,
        hasNextPage: pagination.hasNextPage,
        prevPage: pagination.prevPage,
        nextPage: pagination.nextPage,
        page: pagination.page
    };
    res.render('home', { products, paginationData });
}

const createProduct = (req, res) => {
    res.render('productCreator');
};

const cart = async (req, res) => {
    const cartId = req.user.cart;
    const cart = await cartsService.getCartById(cartId, { populate: true });
    const name = req.user.name;
    const products = cart.products.map(product => product._id);
    res.render('cart', {
        products,
        name
    })

}

// ------------------------------------------------------------------

const login = (req, res) => {
    res.render('login', { css: 'login' });
};

const register = (req, res) => {
    res.render('register', { css: 'register' });
};

const profile = async (req, res) => {
    const history = await historiesService.getHistoryBy({ user: req.user.id })
    res.render('profile', { user: req.user, events: history ? history.events : [] });
};

// const home = async (req, res) => {
//     res.render('home', { user: req.user });
// };

const chat = async (req, res, next) => {
    res.render('chat', {})
}

const logOut = (req, res) => {
    res.render('logout', { user: req.session.user });
    req.session.destroy();
    console.log('Sesion finalizada');
};

const info = (req, res) => {
    res.json({
        server: {
            name: process.title,
            nodeVersion: process.version,
            pid: process.pid,
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
            platform: process.platform,
            architecture: process.arch
        }
    })
};

export default {
    productsGetAll,
    createProduct,
    cart,
    login,
    register,
    profile,
    // home,
    chat,
    logOut,
    info
}