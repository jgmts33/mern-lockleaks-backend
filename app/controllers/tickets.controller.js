import { Sequelize } from "sequelize";
import { io } from "../../server.js";
import db from "../models/index.js";
import path from 'path';

const { tickets: Tickets, messages: Messages, notifications: Notifications, role: Role, user: User } = db;

export const getTickets = async (req, res) => {

  try {

    const tickets = await Tickets.findAll({
      order: [['updatedAt', 'DESC']]
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
      order: [['updatedAt', 'DESC']]
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

    io.emit(`created_new_ticket`, ticket);

    const moderatorsOrAdmins = await User.findAll({
      include: [{
        model: Role,
        as: 'roles',
        where: {
          [Sequelize.Op.or]: [
            {
              name: 'admin'
            },
            {
              name: 'moderator'
            }
          ]
        }
      }]
    })

    for (let each of moderatorsOrAdmins) {
      const newRow = await Notifications.create({
        content: 'New Ticket Received!',
        user_id: each.id
      });
      io.emit(`notification_${each.id}`, newRow)
    }

    await Messages.create({
      sender_id: user_id,
      content,
      attched_images: [],
      ticket_id: ticket.id
    });


    res.status(200).send({
      message: "New Ticket created Successfully!"
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

    await ticket.update({
      status
    });

    io.emit(`update_ticket_status`, { id, status });

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
  const { sender_id, content, ticket_id, attached_image_length } = req.body;

  let attached_images = [];

  for (let i = 0; i < attached_image_length; i++) {
    attached_images.push(req.files[`images[${i}]`]);
  }

  try {

    const ticket = await Tickets.findByPk(ticket_id);

    if (!ticket) {
      res.status(404).send({
        message: "Ticket Not Found!"
      })
    }

    let attachedImageNames = [];
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

    if (ticket.user_id != sender_id) {
      const row = await Notifications.create({
        content: 'Agent responded. Check tickets.',
        user_id: sender_id
      });

      io.emit(`notification_${sender_id}`, row);
    } else {
      const moderatorsOrAdmins = await User.findAll({
        include: [{
          model: Role,
          as: 'roles',
          where: {
            [Sequelize.Op.or]: [
              {
                name: 'admin'
              },
              {
                name: 'moderator'
              }
            ]
          }
        }]
      })

      for (let each of moderatorsOrAdmins) {
        const newRow = await Notifications.create({
          content: 'New Message in Ticket!',
          user_id: each.id
        });
        io.emit(`notification_${each.id}`, newRow)
      }
    }

    res.status(200).send({
      message: "New Message sent Successfully!"
    })
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const addHelpCounts = async (req, res) => {
  const { count } = req.body;
  const { id } = req.params;

  try {

    const ticket = await Tickets.findByPk(id);

    await ticket.update({
      count: ticket.count + count
    });

    io.emit(`update_ticket_count`, ({
      last_count: ticket.count,
      count: count
    }));

    io.emit(`update_ticket_count_${ticket.user_id}`, ({
      last_count: ticket.count,
      count: count
    }));

    res.status(200).send({
      message: "Ticket Count updated Successfully!"
    })


  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }

}