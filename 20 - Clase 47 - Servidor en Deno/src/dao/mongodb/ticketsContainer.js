import ticketModel from "./models/ticket.model.js";

export default class mongoTickets {

    getTickets = () => {
        return ticketModel.find().lean()
    };

    getTicketBy = (params) => {
        return ticketModel.findOne(params).lean()
    };

    createTicket = ticket => {
        return ticketModel.create(ticket)
    };
}