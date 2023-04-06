
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializeStrategies from "./config/passport.config.js";
import cartRouter from './routes/cart.router.js';
import productsRouter from './routes/products.router.js';
import sessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.router.js';
import __dirname from './utils.js';
import config from "./config/config.js";
import { addLoger, levels } from './middleware/logger.js';
import handlebars from 'express-handlebars';
import cors from 'cors';

const app = express();
const PORT = config.app.PORT;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cors);
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongo.URL,
        ttl: 3600,
    }),
    secret: config.session.SECRET2,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000000,
    }
}));

// Passport
initializeStrategies();
app.use(passport.initialize());
app.use(passport.session())

// Engine
app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

//Routers
app.use('./cart', cartRouter);
app.use('/productos', productsRouter)
app.use('/sessions', sessionsRouter);
app.use('/', viewsRouter);

//App Use - LOGGER 
app.use(addLoger);

app.get('/pruebaLogger', (req, res) => {
    levels;
    res.send("ok");
})

app.get('/peticion',(req,res)=>{
    res.send(`Petición atendida por ${process.pid}`)
})

// Conexion al servidor
const connectedServer = app.listen(PORT, () => console.log(`Server ON By Carlos Cogliandro------> http://localhost:${PORT}`));
connectedServer.on('Error al conectar ----->', (error) => { console.log(error) });