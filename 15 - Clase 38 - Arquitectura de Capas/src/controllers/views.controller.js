
import { productsService } from "../dao/index.js";
// import productModel from "../models/product.model.js";

const productsGetAll = async (req, res) => {
    const products = await productsService.getAll();
    console.log(products);
    res.render('productos', { products });
}

const productsSave = (req, res) => {
    res.render('home')
};

// ------------------------------------------------------------------

const login = (req, res) => {
    res.render('login');
};

const register = (req, res) => {
    res.render('register');
};

const profile = (req, res) => {
    res.render('profile', { user: req.session.user });
};

const home = async (req, res) => {
    res.render('home', { user: req.session.user });
};

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
    productsSave,
    login,
    register,
    profile,
    home,
    chat,
    logOut,
    info
}