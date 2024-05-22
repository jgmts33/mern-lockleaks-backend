import db from "../models/index.js";

const { proxiesBots: ProxiesBots } = db;

export const addNewProxiesBot = async (req, res) => {
  const { name, proxies_count, expire_date, credentials } = req.body;

  try {
    const newRow = await ProxiesBots.create({
      name,
      proxies_count,
      expire_date,
      credentials
    });

    res.status(200).send({
      id: newRow.id,
      name: newRow.name,
      proxies_count: newRow.proxies_count,
      expire_date: newRow.expire_date,
      credentials: newRow.credentials
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const updateNewProxiesBot = async (req, res) => {
  const { id } = req.params;
  const { name, proxies_count, expire_date, credentials } = req.body;

  try {

    const proxiesBot = await ProxiesBots.findByPk(id);

    await proxiesBot.update({
      name,
      proxies_count,
      expire_date,
      credentials
    });

    res.status(200).send({
      message: "Proxies Bot Updated Successfully!"
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const deleteProxiesBot = async (req, res) => {
  const { id } = req.params;

  try {

    const proxiesBot = await ProxiesBots.findByPk(id);

    await proxiesBot.destroy();

    res.status(200).send({
      message: "Proxies Bot deleted Successfully!"
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const getProxiesBots = async (req, res) => {
  
  try {

    const proxiesBots = await ProxiesBots.findAll();

    res.status(200).send(proxiesBots);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }

}
