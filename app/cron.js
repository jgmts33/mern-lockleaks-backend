import { Sequelize } from "sequelize";
import db from "./models/index.js";
import axios from "axios";
import { io } from "../server.js";
import { promises } from 'fs';

import ElasticEmail from '@elasticemail/elasticemail-client';
import elasticEmailConfig from './config/elasticEmail.config..js';
import { downloadDataReport } from "./utils/data-report-to-pdf.js";
import { downloadDataAnalytics } from "./utils/data-analytics-to-pdf.js";
import moment from "moment-timezone";

let defaultClient = ElasticEmail.ApiClient.instance;

let apikey = defaultClient.authentications['apikey'];
apikey.apiKey = elasticEmailConfig.auth.apiKey

let api = new ElasticEmail.EmailsApi()

const {
  scrapeSummary: ScrapeSummary,
  socialSummaries: SocialSummaries,
  socialMediaProfiles: SocialMediaProfiles,
  aiBotsSummaries: AIBotsSummaries,
  user: User,
  messages: Messages,
  tickets: Tickets,
  notifications: Notifications,
  role: Role
} = db;

export default async () => {

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

    let scrapedIds = [];

    for (const data of expiredData) {

      try {

        scrapedIds.push(data.id);

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

      io.emit(`scraped_data_expired_${data.user_id}`, data.id);

    }

    io.emit(`scraped_data_expired_admin`, scrapedIds);

  } catch (error) {
    console.error('Error in setting the scraped data as expired after 30 days:', error);
  }

  // Send Data Analytics/Report per month.

  try {

    const users = await User.findAll({
      where: {
        [Sequelize.Op.and]: [
          { 'subscription.status': { [Sequelize.Op.ne]: 'expired' } },
          {
            'subscription.from': {
              [
                Sequelize.Op.between]: [
                  (new Date().setMonth(new Date().getMonth() - 1)).setHours(0, 0, 0, 0),
                  (new Date().setMonth(new Date().getMonth() - 1)).setHours(23, 59, 59, 999)
                  // new Date(new Date(new Date().setMinutes(new Date().getMinutes() - 15)).setSeconds(0, 0)),
                  // new Date(new Date(new Date().setMinutes(new Date().getMinutes() - 15)).setSeconds(59, 999))
                ]
            }
          }
        ]
      },
      include: [{
        model: Role,
        as: 'roles',
        where: {
          name: 'user'
        }
      }]
    }) || [];

    for (const user of users) {

      let dataReportInfo = {
        name: user.name,
        key_metrics: 0,
        ai_bots: 0,
        adult_tubes: 0,
        social_media: 0,
        personal_agent: 0,
        file_hosted: 0,
        user_id: user.id
      }

      // Calculate Scanner Data

      const scrapeDataList = await ScrapeSummary.findAll({
        where: {
          user_id: user.id,
          status: { [Sequelize.Op.ne]: 'expired' },
          progress: 0,
          createdAt: {
            [Sequelize.Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(0, 0, 0, 0)
            // [Sequelize.Op.gte]: new Date(new Date(new Date().setMinutes(new Date().getMinutes() - 15)).setSeconds(0, 0))
          }
        }
      });

      for (const scrapeData of scrapeDataList) {
        dataReportInfo.key_metrics += (
          scrapeData.total_google_links +
          scrapeData.total_google_images +
          scrapeData.total_google_videos +
          scrapeData.total_bing_links +
          scrapeData.total_bing_images +
          scrapeData.total_bing_videos
        )

        dataReportInfo.adult_tubes += (
          scrapeData.matches_count +
          scrapeData.no_matches_count +
          scrapeData.no_report_count +
          scrapeData.report_count
        )

        dataReportInfo.file_hosted += scrapeData.good_count;
      }

      // Calculate Social Scanner Data

      const socialScannerDataList = await SocialSummaries.findAll({
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('result')), 'totalCount'],
        ],
        where: {
          user_id: user.id,
          expired: false,
          progress: 0,
          createdAt: {
            // [Sequelize.Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(0, 0, 0, 0)
            [Sequelize.Op.gte]: new Date(new Date(new Date().setMinutes(new Date().getMinutes() - 15)).setSeconds(0, 0))
          }
        }
      });
      dataReportInfo.social_media += (Number(socialScannerDataList[0]?.dataValues.totalCount) || 0);

      // Calculate Social Profiels Data

      const socialProfilesDataList = await SocialMediaProfiles.findAll({
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('count')), 'totalCount'],
        ],
        where: {
          user_id: user.id,
          createdAt: {
            // [Sequelize.Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(0, 0, 0, 0)
            [Sequelize.Op.gte]: new Date(new Date(new Date().setMinutes(new Date().getMinutes() - 15)).setSeconds(0, 0))
          }
        }
      });
      dataReportInfo.social_media += (Number(socialProfilesDataList[0]?.dataValues.totalCount) || 0);

      // Calculate AI Face Scanner Data

      const aiFaceScannerDataList = await AIBotsSummaries.findAll({
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('result')), 'totalCount'],
        ],
        where: {
          user_id: user.id,
          expired: false,
          progress: 0,
          createdAt: {
            // [Sequelize.Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(0, 0, 0, 0)
            [Sequelize.Op.gte]: new Date(new Date(new Date().setMinutes(new Date().getMinutes() - 15)).setSeconds(0, 0))
          }
        }
      });
      dataReportInfo.ai_bots = aiFaceScannerDataList[0]?.dataValues.totalCount || 0;

      // Calculate Personal Agent Count Data

      const ticketsDataList = await Tickets.findAll({
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('count')), 'totalCount'],
        ],
        where: {
          user_id: user.id,
          status: { [Sequelize.Op.ne]: 'expired' },
          createdAt: {
            // [Sequelize.Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(0, 0, 0, 0)
            [Sequelize.Op.gte]: new Date(new Date(new Date().setMinutes(new Date().getMinutes() - 15)).setSeconds(0, 0))
          }
        }
      });
      dataReportInfo.personal_agent = ticketsDataList[0]?.dataValues.totalCount || 0;

      // Should be fixed later

      let dataAnalyticsInfo = {
        name: user.name,
        hosting_revenue: dataReportInfo.file_hosted,
        subscription_profits: dataReportInfo.adult_tubes,
        advetisement_revenue: dataReportInfo.adult_tubes,
        intermediary_forums_revenue: dataReportInfo.adult_tubes,
        active_websites: dataReportInfo.adult_tubes,
        user_id: user.id,
      }

      await downloadDataReport(dataReportInfo);
      const reportPdfName = `data-report_from_${moment(new Date().setMonth(new Date().getMonth() - 1)).format("DD_MMM_YYYY")}_to_${moment(new Date()).format("DD_MMM_YYYY")}_${dataReportInfo.user_id}.pdf`;
      const reportPdfBuffer = await promises.readFile(`./pdfs/${reportPdfName}`);
      const reportPdfBase64 = reportPdfBuffer.toString('base64');

      let attachments = [
        ElasticEmail.MessageAttachment.constructFromObject({
          Name: `Data Report.pdf`,
          BinaryContent: reportPdfBase64, // This should be replaced with the actual file content or a stream
          ContentType: "application/pdf"
        })
      ]

      if (user.subscription.plan_id == 4) {
        await downloadDataAnalytics(dataAnalyticsInfo);
        const analyticsPdfName = `data-analytics_from_${moment(new Date().setMonth(new Date().getMonth() - 1)).format("DD_MMM_YYYY")}_to_${moment(new Date()).format("DD_MMM_YYYY")}_${dataAnalyticsInfo.user_id}.pdf`;
        const analyticsPdfBuffer = await promises.readFile(`./pdfs/${analyticsPdfName}`);
        const analyticsPdfBase64 = analyticsPdfBuffer.toString('base64');

        await user.update({
          data_report: reportPdfName,
          data_analytics: analyticsPdfName
        });

        attachments.push(
          ElasticEmail.MessageAttachment.constructFromObject({
            Name: `Data Analytics.pdf`,
            BinaryContent: analyticsPdfBase64, // This should be replaced with the actual file content or a stream
            ContentType: "application/pdf"
          })
        );

        const row = await Notifications.create({
          content: 'Data Analytics sent. Check your email.',
          user_id: user.id
        });

        io.emit(`notification_${user.id}`, row);

      } else {
        await user.update({
          data_report: reportPdfName
        });
      }


      const emailBodyContent = {
        title: `Monthly Data Analytics Report - Lock Leaks`,
        content: `<h4>Dear ${user.name}</h4>
        <br />
        <p>Attached is your monthly data report in PDF format. This detailed report provides comprehensive insights into your content's performance, including analysis of trends, interactions, and other relevant data.</p>
        <br />
        <p>Please find the report attached for a full overview of the analytics and potential future strategies.</p>
        <br />
        <p>Thank you for choosing our service..</p>
        <br />
        <p>Best regards,</p>
        <p>Lock Leaks Team</p>
        <a href="https://lockleaks.com">lockleaks.com</a>
        `
      }

      const fileEmailContent = ElasticEmail.EmailMessageData.constructFromObject({
        Recipients: [new ElasticEmail.EmailRecipient(user.email)],
        Content: {
          Body: [
            ElasticEmail.BodyPart.constructFromObject({
              ContentType: "HTML",
              Content: emailBodyContent.content,
            }),
          ],
          Attachments: attachments,
          Subject: emailBodyContent.title,
          From: elasticEmailConfig.auth.authEmail,
        },
      });

      const fileCallback = async (error, data, response) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Email Sent Successfully!");
        }
      };

      api.emailsPost(fileEmailContent, fileCallback);

      const row = await Notifications.create({
        content: 'Data report sent. Check your email.',
        user_id: user.id
      });

      io.emit(`notification_${user.id}`, row);
    }

  } catch (error) {
    console.error('Error in setting the subscription status as expired:', error);
  }

  // Setting the Subscription as expired.

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

        console.log(`Subscription Expired for the user:${user.id}`);

        io.emit(`payment_status_${user.id}`, 'expired');

      } catch (err) {
        console.log("err:", err);
      }
    }

  } catch (error) {
    console.error('Error in setting the subscription status as expired:', error);
  }

  // Delete the Tickets and Messages after 30 days.

  try {

    let ticketExpirationDate = new Date();
    ticketExpirationDate.setDate(ticketExpirationDate.getDate() - 30); // Calculate 30 days ago

    const tickets = await Tickets.findAll({
      where: {
        createdAt: { [Sequelize.Op.lt]: ticketExpirationDate },
      },
    }) || [];

    for (const ticket of tickets) {
      try {
        await ticket.destroy();
        console.log(`Tciket deleted after 30 days for the ticket:${ticket.id}`)
        io.emit(`ticket_deleted`, ticket.id);
        io.emit(`ticket_deleted_${ticket.user_id}`, ticket.id);
      } catch (err) {
        console.log("err:", err);
      }
    }

  } catch (error) {
    console.error('Error ing deleting tickets  after 30 days.:', error);
  }

  // Closing the Ticket after 6 days with no response.

  try {

    let ticketExpirationDate = new Date();
    ticketExpirationDate.setDate(ticketExpirationDate.getDate() - 7); // Calculate 6 days ago

    const tickets = await Tickets.findAll({
      where: {
        status: 'open'
      }
    });

    console.log("tickets:", tickets);

    for (const ticket of tickets) {
      const messages = await Messages.findAll({
        where: {
          sender_id: 1,
          updatedAt: {
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
We noticed that we haven't received any further information from you regarding your issue. If you could provide us with your account username and any error messages you're encountering, we would be happy to assist you further.
Please note that if we do not hear back from you within the next 24 hours, your ticket will be automatically closed. If your issue persists, you can always reopen a new ticket or respond to this message, and we'll be here to help.
Thank you for your understanding.
Best regards,
[Admin Name]
LockLeaks Support Team \n`
        })
        await ticket.update({
          status: 'closed'
        });
        console.log(`Tciket closed after 7 days with not response:${ticket.id}`);
      }

      const row = await Notifications.create({
        content: 'Your ticket has been closed.',
        user_id: ticket.user_id
      });

      io.emit(`notification_${ticket.user_id}`, row)
      io.emit(`ticket_closed_${ticket.user_id}`, ticket.id);
      io.emit(`ticket_closed_admin`, ticket.id);

    }

  } catch (error) {
    console.error('Error in setting the Trial plan as expired after 7 days.:', error);
  }

};
