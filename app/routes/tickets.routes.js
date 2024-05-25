import authJwt from "../middleware/authjwt.js";
import { createNewTicket, getMessagesByTicket, getTickets, sendMessage, updateTicketStatus } from '../controllers/tickets.controller.js';
// import multer from 'multer';

// const upload = multer();

export default function (app) {

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/tickets",
    [authJwt.verifyToken],
    getTickets
  );

  app.get(
    "/tickets/:id",
    [authJwt.verifyToken],
    getMessagesByTicket
  )

  app.post(
    "/tickets/:user_id",
    [authJwt.verifyToken],
    createNewTicket
  )

  app.patch(
    "/tickets/:id",
    [authJwt.verifyToken],
    updateTicketStatus
  )

  app.post(
    "/tickets/message",
    [authJwt.verifyToken],
    sendMessage
  )
};