import mongoose from "mongoose";
import config from '../config/config.js';

const persistence = "MONGO";

export let usersService;
export let productsService;
export let cartsService;
export let ticketsService;
export let historiesService;

switch (persistence) {
    case 'MONGO':
        mongoose.set('strictQuery', false)
        const connection = mongoose.connect(config.mongo.URL);
        
        const { default: mongoUsers } = await import('./mongodb/usersContainer.js');
        const { default: mongoProducts } = await import('./mongodb/productsContainer.js');
        const { default: mongoCarts } = await import('./mongodb/cartContainer.js');
        const { default: mongoTickets } = await import('./mongodb/ticketsContainer.js');
        const { default: mongoHistories } = await import('./mongodb/historiesContainer.js');

        usersService = new mongoUsers();
        productsService = new mongoProducts();
        cartsService = new mongoCarts();
        ticketsService = new mongoTickets();
        historiesService = new mongoHistories();

        break;
};