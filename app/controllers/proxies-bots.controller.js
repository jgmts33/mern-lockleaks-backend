import db from "../models/index.js";

const { proxiesBots: ProxiesBots } = db;

export const addNewProxiesBot = async (req, res) => {
  const {
    vps_source,
    ip_address,
    username,
    password,
    vps_expire_date,
    proxy_source,
    proxy_credentials,
    proxy_type,
    proxy_expire_date,
  } = req.body;

  try {
    const newRow = await ProxiesBots.create({
      vps_source,
      ip_address,
      username,
      password,
      vps_expire_date,
      proxy_source,
      proxy_credentials,
      proxy_type,
      proxy_expire_date,
    });

    res.status(200).send({
      id: newRow.id,
      vps_source: newRow.vps_source,
      ip_address: newRow.ip_address,
      username: newRow.username,
      password: newRow.password,
      vps_expire_date: newRow.vps_expire_date,
      proxy_source: newRow.proxy_source,
      proxy_credentials: newRow.proxy_credentials,
      proxy_type: newRow.proxy_type,
      proxy_expire_date: newRow.proxy_expire_date,
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const updateNewProxiesBot = async (req, res) => {
  const { id } = req.params;
  const {
    vps_source,
    ip_address,
    username,
    password,
    vps_expire_date,
    proxy_source,
    proxy_credentials,
    proxy_type,
    proxy_expire_date,
  } = req.body;

  try {

    const proxiesBot = await ProxiesBots.findByPk(id);

    await proxiesBot.update({
      vps_source,
      ip_address,
      username,
      password,
      vps_expire_date,
      proxy_source,
      proxy_credentials,
      proxy_type,
      proxy_expire_date,
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
