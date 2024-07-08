import Ticket from '../models/ticket.model.js';
import Manager from '../Manager.mongo.js';

const ticketManager = new Manager(Ticket); // Crear una instancia de TicketManager
export default ticketManager;