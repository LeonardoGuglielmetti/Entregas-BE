import { cartsService, historiesService, ticketsService, usersService } from "../dao/index.js";
import { makeid } from "../utils.js";
import { DateTime } from "luxon";

const insertProductToCart = async (req, res) => {
    const user = req.user;
    const productId = req.params.vid;
    const cart = await cartsService.getCartById(user.cart); // TENGO UN PROBLEMA CON ESTA LINEA
    const exists = cart.products.find(product => product._id.toString() === productId);
    if (exists) return res.status(400).send({ status: 'error', error: "Game already exist" });
    cart.products.push({ _id: productId });
    await cartsService.updateCart(cart._id, { products: cart.products });
    res.redirect('/cart');
};

const purchase = async (req, res) => {
    const user = await usersService.getBy({ _id: req.user._id });
    const cart = await cartsService.getCartById(user.cart);
    const populatedCart = await cartsService.getCartById(user.cart, { populate: true })
    let exists = false;
    cart.products.forEach(product => {
        exists = user.library.some(productInLibrary => productInLibrary._id.toString() === product._id.toString());
    });
    if (exists) return res.status(400).send({ status: 'error', error: 'Operacion no completada por producto ya agregado a la libreria' });
    const newLibrary = [...user.library, ...cart.products];
    const ticket = {
        user: user._id,
        products: cart.products,
        total: populatedCart.products.reduce((previous, current) => previous + current._id.price, 0),
        code: makeid(14)
    };
    await usersService.updateUser(user._id, { library: newLibrary });
    await cartsService.updateCart(cart._id, { products: [] });
    await ticketsService.createTicket(ticket);
    const history = await historiesService.getHistoryBy({ user: user._id });
    const event = {
        event: 'Purchase',
        date: DateTime.now().toISO(),
        description: `Se realizo una compra de ${populatedCart.products.length > 1 ? 'multiples productos' : 'un producto'}`
    }
    if (!history) {
        await historiesService.createHistory({ user: user._id, events: [event] })
    } else {
        history.events.push(event);
        await historiesService.updateHistory(history._id, { events: history.events })
    }
    res.send({ status: 'success', message: 'Productos agregados a la libreria' });
    // AQUI SE ENVIA EL TICKET DE COMPRA POR NODEMAILER

};

export default {
    insertProductToCart,
    purchase
};