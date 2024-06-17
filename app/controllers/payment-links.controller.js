import { io } from "../../server.js";
import db from "../models/index.js";
import pkg from 'ping'

const { paymentLinks: PaymentLinks, user: User, usernames: Usernames } = db;

export const getPaymentLinkInfo = async (req, res) => {

  const { code } = req.query

  try {

    const paymentLink = await PaymentLinks.findOne({
      where: {
        code
      }
    });

    const user = await User.findByPk(paymentLink.user_id);

    res.status(200).send({
      usernames: paymentLink.usernames,
      expire_date: paymentLink.expire_date,
      status: paymentLink.status,
      amount: paymentLink.amount,
      user_counts: user.user_counts,
      email: user.email
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const createPaymentLink = async (req, res) => {

  const { email, usernames, user_counts, amount } = req.body;

  try {

    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(404).send({
        message: "User Not Found"
      });
    }

    if (user_counts) {
      await user.update({
        agency: true,
        user_counts
      })
    }

    const currentDate = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).replace(/[/,:]/g, '').replace(/\s/g, '');

    const code = `auto-pay${currentDate}${user.id}`;
    const expire_date = new Date().setDate(new Date().getDate() + 2);

    const payment_link = await PaymentLinks.create({
      code,
      user_id: user.id,
      usernames,
      expire_date,
      status: 'active',
      amount
    });

    setTimeout(async () => {
      if (payment_link.status != 'paid')
        await payment_link.update({
          status: 'expired'
        });
      io.emit(`payment_link_status_${code}`, 'expired');
      // set as Expired after 48 hours
    }, 1000 * 60 * 5)
    // }, 1000 * 60 * 60 * 24 * 2)

    res.status(200).send({
      code
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const createFanPaymentLink = async (req, res) => {

  const { id } = req.params;
  const { usernames, amount , period } = req.body;

  try {

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({
        message: "User Not Found"
      });
    }

    const currentDate = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).replace(/[/,:]/g, '').replace(/\s/g, '');

    const code = `auto-pay${currentDate}${user.id}`;
    const expire_date = new Date().setDate(new Date().getDate() + 2);

    const payment_link = await PaymentLinks.create({
      code,
      user_id: user.id,
      usernames,
      expire_date,
      period,
      status: 'active',
      amount
    });

    setTimeout(async () => {
      if (payment_link.status != 'paid')
        await payment_link.update({
          status: 'expired'
        });
      io.emit(`payment_link_status_${code}`, 'expired');
      // set as Expired after 48 hours
    }, 1000 * 60 * 2)
    // }, 1000 * 60 * 60 * 24 * 2)

    res.status(200).send({
      code
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const updatePaymentLink = async (req, res) => {

  const { code, payment_method } = req.body;

  try {

    const paymentLink = await PaymentLinks.findOne({
      where: {
        code
      }
    });

    if (paymentLink.status != 'active') {
      return res.status(500).send({
        message: 'Payment Link is not invalid!'
      });
    }

    await paymentLink.update({
      status: 'paid'
    });

    for (let item of paymentLink.usernames) {
      const { username, link } = item;
      await Usernames.create({
        username,
        link: link,
        userId: paymentLink.user_id
      })
    }

    let expire_date = new Date();

    expire_date.setDate(expire_date.getDate() + 30);

    const user = await User.findByPk(paymentLink.user_id);

    await user.update({
      subscription: {
        payment_method: payment_method,
        from: new Date(),
        expire_date,
        period: paymentLink.period ? paymentLink.period : user.subscription.period || null,
        plan_id: 4 /* Star Plan */,
        status: 'active' // 'active'| 'expired'
      }
    });

    io.emit(`payment_link_status_${code}`, 'paid');

    res.status(200).send({
      message: `Payment Link was updated as 'Paid' successfully and usernames were created to ${paymentLink.user_id}`
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};