import { createHash, validatePassword } from "../services/auth.js";
import jwt from "jsonwebtoken";
import config from '../config/config.js';
import { cartsService, usersService } from "../dao/index.js";

const register = async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(500).send({ status: 'error', error: 'Error al cargar el archivo' });
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) return res.status(400).send({ status: "error", error: "Valores incompletos" });
        const exists = await usersService.getBy({ email });
        if (exists) return res.status(400).send({ status: "error", error: "El usuario ya existe" });
        const hashedPassword = await createHash(password);
        const cart = await cartsService.createCart();
        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword,
            cart: cart._id,
            avatar: `${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`,
            library: []
        }
        const result = await usersService.save(user);
        res.send({ status: "success", message: "Registrado" });
    } catch {
        res.status(500).send({ status: "error", error: "Error al registrar nuevo usuario" });
    };
};

const login = async (req, res) => {
    const user = req.user;
    req.session.user = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    res.send({ status: "success", message: "Logueado!" });
};

const loginFail = async (req, res) => {
    console.log(req.session.messages);
    if (req.session.messages.length > 4) return res.status(400).send({ message: "BLOQUEA LOS INTENTOS AHORA!!!!!" })
    res.status(400).send({ status: "error", error: "Error de autenticación" })
};

const gitHubCallback = async (req, res) => {
    const user = req.user;
    req.session.user = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    res.send({ status: "success", message: "Logueado con Git-Hub!" })
};

const googleCallback = async (req, res) => {
    const user = req.user;
    req.session.user = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    res.send({ status: "success", message: "Logueado con Google!" })
};

const facebookCallBack = async (req, res) => {
    const user = req.user;
    req.session.user = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    res.send({ status: "success", message: "Logueado con Facebook!" })
};

const logintoken = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersService.getBy({ email });
        if (!user) return res.status(400).send({ status: "error", error: "Email inválido" });
        const isValidPassword = await validatePassword(password, user.password);
        if (!isValidPassword) return res.status(400).send({ status: "error", error: "Contraseña incorrecta" })
        const tokenizedUser = {
            cart: user.cart,
            name: `${user.first_name} ${user.last_name}`,
            role: user.role,
            id: user._id,
            avatar: user.avatar || 'URL generico',
        }
        const token = jwt.sign(tokenizedUser, config.jwt.SECRET, { expiresIn: "1d" });
        res.cookie(config.jwt.COOKIE, token).send({ status: "success", message: "logged in" })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error del servidor" })
    };
};

const current = async (req, res) => {
    const { token } = req.query;
    const user = jwt.verify(token, config.jwt.SECRET);
    console.log(user);
    res.send({ status: "success", payload: user });
};

export default {
    register,
    login,
    loginFail,
    gitHubCallback,
    googleCallback,
    facebookCallBack,
    logintoken,
    current
}