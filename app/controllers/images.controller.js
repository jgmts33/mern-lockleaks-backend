import path from 'path';

export const getImages = async (req, res) => {

  try {

    const filePath = path.join(`/root/lockleaks-backend/uploads/${req.query.filename}`);

    res.status(200).sendFile(filePath);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}