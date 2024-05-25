import { io } from "../../server.js";
import db from "../models/index.js";
import pkg from 'ping'

const { tickets: Tickets, messages: Messages } = db;

export const getTickets = async (req, res) => {

  try {

    const tickets = await Tickets.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.status(200).send(tickets);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const getTicketsByUser = async (req, res) => {

  const { id } = req.params;

  try {

    const tickets = await Tickets.findAll({
      where: {
        user_id: id
      },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).send(tickets);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const getMessagesByTicket = async (req, res) => {

  const { id } = req.params;

  try {

    const messages = await Messages.findAll({
      where: {
        ticket_id: id
      }
    });

    res.status(200).send(messages);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const createNewTicket = async (req, res) => {

  const { user_id } = req.params
  const { name, content } = req.body;

  try {

    const ticket = await Tickets.create({
      name,
      status: '',
      user_id
    });

    await Messages.create({
      sender_id: user_id,
      content,
      attched_images: [],
      ticket_id: ticket.id
    });

    res.status(200).send({
      message: "New Ticker created Successfully!"
    })

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const updateTicketStatus = async (req, res) => {

  const { id } = req.params;
  const { status } = req.body;

  try {

    const ticket = await Tickets.findByPk(id);

    ticket.update({
      status
    });

    res.status(200).send({
      message: "Ticket Status updated Successfully!"
    })

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const sendMessage = async (req, res) => {
  const { sender_id, content, ticket_id } = req.body;
  const attached_images = req.files ? req.files['images'] : [];

  try {
    let attachedImageNames = []
    for (let attached_image of attached_images) {

      const currentDate = new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).replace(/[/,:]/g, '-').replace(/\s/g, '_');

      const attachedImageFilePath = path.join(`./uploads/message_attach_${currentDate}_${attached_image.name}`);
      await attached_image.mv(attachedImageFilePath);
      attachedImageNames.push(`message_attach_${currentDate}_${attached_image.name}`);
    }

    const newMessage = await Messages.create({
      sender_id,
      content,
      ticket_id,
      attached_images: attachedImageNames
    });

    io.emit(`new_message_${ticket_id}`, newMessage);

    res.status(200).send({
      message: "New Message sent Successfully!"
    })
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}