import { Sequelize } from "sequelize";
import db from "./app/models/index.js";
import axios from "axios";

const { scrapeSummary: ScrapeSummary, user: User, messages: Messages, tickets: Tickets } = db;

(async () => {

  // Setting the scraped data as expired after 30 days.
  try {

    const scrapedExpirationDate = new Date();
    scrapedExpirationDate.setDate(scrapedExpirationDate.getDate() - 30); // Calculate 30 days ago

    const expiredData = await ScrapeSummary.findAll({
      where: {
        createdAt: { [Sequelize.Op.lt]: scrapedExpirationDate },
        status: { [Sequelize.Op.ne]: 'expired' } // Exclude already expired data
      },
      attributes: ['id', 'scrape_date']
    });

    for (const data of expiredData) {

      try {

        await ScrapeSummary.update(
          { status: 'expired' },
          { where: { id: data.id } }
        );
        console.log("data.scrape_date:", data.scrape_date);
        await axios.post(`https://api.lockleaks.com/delete-file`, {
          folder_name: data.scrape_date
        });

        console.log(`Removed ${data.scrape_date} record because that is expired.`);

      } catch (err) {
        console.log("err:", err);
      }

    }

  } catch (error) {
    console.error('Error in setting the scraped data as expired after 30 days:', error);
  }

  // Setting the Trial plan as expired after 3 days.

  try {

    const users = await User.findAll({
      where: {
        subscription: {
          [Sequelize.Op.and]: [
            { status: { [Sequelize.Op.ne]: 'expired' } },
            { expire_date: { [Sequelize.Op.lt]: new Date() } }
          ]
        }
      }
    }) || [];

    for (const user of users) {
      try {
        await user.update({
          subscription: {
            ...user.subscription,
            status: 'expired' // 'active'| 'expired'
          }
        });

        console.log(`Trial Expired for the user:${user.id}`)

      } catch (err) {
        console.log("err:", err);
      }
    }

  } catch (error) {
    console.error('Error in setting the Trial plan as expired after 3 days.:', error);
  }

  // Clear the Tickets and Messages after 30 days.

  try {

    const ticketExpirationDate = new Date();
    // ticketExpirationDate.setDate(ticketExpirationDate.getDate() - 30); // Calculate 30 days ago
    ticketExpirationDate = new Date( Number(ticketExpirationDate) - 3 * 60 * 1000 );

    const tickets = await Tickets.findAll({
      where: {
        createdAt: { [Sequelize.Op.lt]: ticketExpirationDate },
        status: { [Sequelize.Op.ne]: 'open' }
      },
    }) || [];

    for (const ticket of tickets) {
      try {
        await ticket.destroy();
        console.log(`Tciket deleted after 30 days for the ticket:${ticket.id}`)
      } catch (err) {
        console.log("err:", err);
      }
    }

  } catch (error) {
    console.error('Error ing deleting tickets  after 30 days.:', error);
  }

  // Closing the Ticket after 6 days with no response.

  try {

    const ticketExpirationDate = new Date();
    // ticketExpirationDate.setDate(ticketExpirationDate.getDate() - 1); // Calculate 6 days ago
    ticketExpirationDate = new Date( Number(ticketExpirationDate) - 2 * 60 * 1000 );

    const tickets = await Tickets.findAll({
      where: {
        status: 'open'
      }
    });

    console.log("tickets:", tickets);

    for (const ticket of tickets) {
      const messages = await Messages.findAll({
        where: {
          sender_id: {
            [Sequelize.Op.ne]: 1 // Not equal to 1
          },
          createdAt: {
            [Sequelize.Op.lt]: ticketExpirationDate
          }
        },
        order: [['createdAt', 'DESC']], // Order messages by createdAt DESC to get the latest one
        limit: 1 // Only take the latest message per ticket
      });

      if (messages.length) {
        await Messages.create({
          sender_id: 1,
          ticket_id: ticket.id,
          content: `Hello again,
          \n\n
          We noticed that we haven't received any further information from you regarding your issue. If you could provide us with your account username and any error messages you're encountering, we would be happy to assist you further.
          \n\n
          Please note that if we do not hear back from you within the next 24 hours, your ticket will be automatically closed. If your issue persists, you can always reopen a new ticket or respond to this message, and we'll be here to help.
          \n\n
          Thank you for your understanding.
          \n\n
          Best regards, \n
          [Admin Name]\n
          LockLeaks Support Team \n`
        })
        await ticket.update({
          status: 'closed'
        });
        console.log(`Tciket closed after 7 days with not response:${ticket.id}`);
      }
    }

  } catch (error) {
    console.error('Error in setting the Trial plan as expired after 7 days.:', error);
  }

})();