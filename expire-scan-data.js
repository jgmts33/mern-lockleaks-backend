import { Sequelize } from "sequelize";
import db from "./app/models/index.js";
import axios from "axios";

const { scrapeSummary: ScrapeSummary, user: User } = db;

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
    
    const users = User.findAll({
      where: {
        subscription: {
          [Sequelize.Op.and]: [
            { status: { [Sequelize.Op.ne]: 'expired' } },
            { expire_date: { [Sequelize.Op.lt]: new Date() } }
          ]
        }
      }
    });

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
})();
