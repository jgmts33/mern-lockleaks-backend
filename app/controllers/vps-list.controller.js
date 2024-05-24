import db from "../models/index.js";

const { vpsList: VpsList } = db;

export const getVpsList = async (req, res) => {

  try {

    const vps_list = await VpsList.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.status(200).send(vps_list);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const getVpsInfo = async (req, res) => {

  const { id } = req.params;

  try {

    const vps = await VpsList.findByPk(id);

    res.status(200).send(vps);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const createVps = async (req, res) => {

  const { ip_address, subdomain } = req.body;

  try {

    await VpsList.create({
      ip_address,
      subdomain
    });

    res.status(200).send({
      message: "New vps created Successfully!"
    })

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const updateVpsInfo = async (req, res) => {

  const { id } = req.params;
  const { ip_address, subdomain } = req.body;

  try {

    const vps = await VpsList.findByPk(id);

    vps.update({
      ip_address,
      subdomain
    });

    res.status(200).send({
      message: "VPS Info updated Successfully!"
    })

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const deleteVps = async (req, res) => {

  const { id } = req.params;

  try {

    const vps = await VpsList.findByPk(id);
    vps.destroy();

    res.status(200).send({
      message: "VPS deleted Successfully!"
    })

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};