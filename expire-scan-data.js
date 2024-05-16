import { Sequelize } from "sequelize";
import db from "./app/models/index.js";
import fs from 'fs';
import path from 'path';

const { scrapeSummary: ScrapeSummary } = db;

(async () => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30); // Calculate 30 days ago

  try {
    const expiredData = await ScrapeSummary.findAll({
      where: {
        createdAt: { [Sequelize.Op.lt]: expirationDate },
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

        await axios.post(`${process.env.BOT_API_ENDPOINT}/delete-file`, {
          folder_name: data.scrape_date
        });

        console.log(`Removed ${data.scrape_date} record because that is expired.`);

      } catch (err) {
        console.log(err);
      }

    }

  } catch (error) {
    console.error('Error updating expired data:', error);
  }
})();
