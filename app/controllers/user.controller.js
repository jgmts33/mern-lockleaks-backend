import { Op } from "sequelize";
import db from "../models/index.js";
import crypto from 'crypto';
import archiver from "archiver";
import archiverZipEncryptable from 'archiver-zip-encryptable';
import { io } from '../../server.js';
import path from 'path';

archiver.registerFormat('zip-encryptable', archiverZipEncryptable);

import ElasticEmail from '@elasticemail/elasticemail-client';
import elasticEmailConfig from '../config/elasticEmail.config..js';

let defaultClient = ElasticEmail.ApiClient.instance;

let apikey = defaultClient.authentications['apikey'];
apikey.apiKey = elasticEmailConfig.auth.apiKey

let api = new ElasticEmail.EmailsApi()

const { user: User, scrapeSummary: ScrapeSummary, subscriptionOptions: SubscriptionOptions } = db;

export const getUserInfo = (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let subscription = user.subscription;

      if (user.subscription.plan_id) {
        const subscriptionFeatures = await SubscriptionOptions.findByPk(user.subscription.plan_id);
        subscription = {
          ...user.subscription,
          features: subscriptionFeatures
        }
      }

      user.getRoles().then(roles => {

        res.status(200).send({
          id: user.id,
          email: user.email,
          roles: roles.map((role) => role.name),
          name: user.name,
          avatar: user.avatar,
          verified: user.verified,
          subscription: subscription,
          social: user.social,
          contract: user.contract,
          copyright_holder: user.copyright_holder
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}
export const getUsersList = async (req, res) => {

  const { page, search, contract, copyright_holder } = req.query;

  let whereCondition = {
    [Op.and]: [
      {
        email: {
          [Op.ne]: 'admin@lockleaks.com'
        }
      },
      {
        [Op.or]: [
          {
            email: {
              [Op.like]: '%' + search + '%'
            }
          },
          {
            name: {
              [Op.like]: '%' + search + '%'
            }
          }
        ]
      }
    ]
  };

  if (contract) {
    whereCondition = {
      [Op.and]: [
        {
          email: {
            [Op.ne]: 'admin@lockleaks.com'
          },
          contract: {
            status: {
              [Op.eq]: contract
            }
          }
        },
        {
          [Op.or]: [
            {
              email: {
                [Op.like]: '%' + search + '%'
              }
            },
            {
              name: {
                [Op.like]: '%' + search + '%'
              }
            }
          ]
        }
      ]
    }
  }

  if (copyright_holder) {
    let copyright_holder_condition = {
      [Op.eq]: ""
    };

    if (copyright_holder == 'sent') {
      copyright_holder_condition = {
        [Op.ne]: ""
      }
    }

    whereCondition = {
      [Op.and]: [
        {
          email: {
            [Op.ne]: 'admin@lockleaks.com'
          },
          contract: {
            status: {
              [Op.eq]: 'approved'
            }
          },
          subscription: {
            plan_id: {
              [Op.eq]: 4
            }
          },
          copyright_holder: { ...copyright_holder_condition }
        },
        {
          [Op.or]: [
            {
              email: {
                [Op.like]: '%' + search + '%'
              }
            },
            {
              name: {
                [Op.like]: '%' + search + '%'
              }
            }
          ]
        }
      ]
    }
  }

  try {
    const { count: totalCount, rows: users } = await User.findAndCountAll({
      where: whereCondition,
      limit: 6,
      offset: (page - 1) * 6
    });

    const responseData = [];

    for (let user of users) {

      await user.getRoles().then(roles => {

        responseData.push({
          id: user.id,
          email: user.email,
          roles: roles.map((role) => role.name),
          name: user.name,
          avatar: user.avatar,
          verified: user.verified,
          subscription: user.subscription,
          social: user.social,
          contract: user.contract,
          copyright_holder: user.copyright_holder
        });
      });
    }

    res.status(200).send({
      data: responseData,
      totalCount: totalCount,
      totalPage: Math.ceil(totalCount / 6)
    });

  }
  catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message
    })
  }
}

export const updateUserInfo = async (req, res) => {

  const { id } = req.params;
  const { email, password } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({
        message: "User Not Found!"
      });
    }

    const sameEmailUser = await User.findOne({
      where: {
        email
      }
    });

    if (sameEmailUser) {
      return res.status(403).send({
        message: "That email already existed!"
      });
    }

    let updateData = {
      email
    }

    if (password) {
      updateData.password = bcrypt.hashSync(password, 8)
    }

    await user.update({ ...updateData });

    res.status(200).send({
      message: `UserInfo updated ${user.id}`
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message
    })
  }

}

export const updateUserVisible = async (req, res) => {

  const { id } = req.params;
  const { ban } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({
        message: "User Not Found!"
      });
    }
    await user.update({
      ban
    });

    res.status(200).send({
      message: `User Visible updated ${user.id}`
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message
    })
  }

}

export const updateUserRole = async (req, res) => {

  const { id } = req.params;
  const { roles } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({
        message: "User Not Found!"
      });
    }

    await user.update({
      roles
    });

    res.status(200).send({
      message: `UserInfo updated ${user.id}`
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message
    })
  }

}


export const getExtraReport = async (req, res) => {

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  try {
    const weeklyUserCount = await User.count({
      where: {
        email: {
          [Op.not]: 'admin@lockleaks.com'
        },
        createdAt: {
          [Op.between]: [oneWeekAgo, new Date()]
        }
      }
    });

    const userCount = await User.count({
      where: {
        email: {
          [Op.not]: 'admin@lockleaks.com'
        }
      }
    });

    const weeklyOrderCount = await ScrapeSummary.count({
      where: {
        createdAt: {
          [Op.between]: [oneWeekAgo, new Date()]
        }
      }
    });

    const orderCount = await ScrapeSummary.count();

    res.status(200).send({
      user: {
        total: userCount,
        weekly: weeklyUserCount
      },
      order: {
        total: orderCount,
        weekly: weeklyOrderCount
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message
    })
  }


}

export const updatePaymentStatus = async (req, res) => {

  const { id } = req.params;
  const { payment_method, plan } = req.body;
  // trial , starter, pro, star

  try {
    const user = await User.findByPk(id);
    const subscriptionOption = await SubscriptionOptions.findOne({
      where: {
        option_name: plan
      }
    });

    let expire_date = new Date();
    if (plan == 'trial') expire_date.setDate(expire_date.getDate() + 3);
    else expire_date.setDate(expire_date.getDate() + 30);

    if (!user) {
      return res.status(404).send({
        message: "User Not Found!"
      });
    }

    await user.update({
      subscription: {
        payment_method: payment_method,
        expire_date,
        plan_id: subscriptionOption.id,
        status: 'active' // 'active'| 'expired'
      }
    });

    res.status(200).send({
      message: `Payment was successed as ${plan}/${payment_method}`
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message
    })
  }

}

export const handleDeleteSubmition = async (req, res) => {
  const { name, email, capacityContent, legislationContent, specificContent } = req.body;

  try {

    const title = `Delete Submition | ${name}`;
    const content = `<div> Full Name: ${name}<br/>
    Email used on lockleaks: ${email}<br/>
    Your capacity in making this request: ${capacityContent}<br/>
    Under which legislation are you making this request?: ${legislationContent}<br/>
    Do you have a specific request related to your personal data?: ${specificContent} <br/></div>
    `

    let emailContent = ElasticEmail.EmailMessageData.constructFromObject({
      Recipients: [
        new ElasticEmail.EmailRecipient(`support@lockleaks.com`)
      ],
      Content: {
        Body: [
          ElasticEmail.BodyPart.constructFromObject({
            ContentType: "HTML",
            Content: content
          })
        ],
        Subject: title,
        From: elasticEmailConfig.auth.deletionEmail,
      }
    });

    var callback = function (error, data, response) {
      if (error) {
        console.error(error);
      } else {

        res.status(200).send({
          message: "Data Submitted Successfully!"
        })

      }
    };

    api.emailsPost(emailContent, callback);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const deleteUser = async (req, res) => {

  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({
        message: "User Not Found!"
      });
    }

    await user.destroy();

    res.status(200).send({
      message: `User deleted ${id}`
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message
    })
  }

}

async function createZipArchive(files, password) {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip-encryptable', {
      zlib: { level: 9 },
      password,
    });

    archive.on('error', (err) => reject(err));

    let buffers = [];
    archive.on('data', (chunk) => {
      // Store the chunk in the buffers array
      buffers.push(chunk);
    });

    archive.on('end', () => {
      // Convert the buffers to a single buffer and resolve the promise
      const finalBuffer = Buffer.concat(buffers);
      resolve(finalBuffer);
    });

    Object.entries(files).forEach(([name, file]) => {
      console.log("file:", file);
      archive.append(file.data, { name: `${name}.png` });
    });

    archive.finalize();
  });
}

async function sendEmail(user, files, supportEmail, subject, bodyContent) {
  try {
    const password = crypto.randomBytes(32).toString('hex');
    const archiveBuffer = await createZipArchive(files, password);
    const archiveBase64 = archiveBuffer.toString('base64');
    const fileEmailContent = ElasticEmail.EmailMessageData.constructFromObject({
      // Recipients: [new ElasticEmail.EmailRecipient('golden.peach.ts@gmail.com')],
      Recipients: [new ElasticEmail.EmailRecipient(supportEmail)],
      Content: {
        Body: [
          ElasticEmail.BodyPart.constructFromObject({
            ContentType: "HTML",
            Content: bodyContent,
          }),
        ],
        Attachments: [
          ElasticEmail.MessageAttachment.constructFromObject({
            Name: `${subject}.zip`,
            BinaryContent: archiveBase64, // This should be replaced with the actual file content or a stream
            ContentType: "application/zip"
          })
        ],
        Subject: subject,
        From: elasticEmailConfig.auth.kycEmail,
      },
    });

    const fileCallback = (error, data, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Data Submitted Successfully!");
      }
    };

    api.emailsPost(fileEmailContent, fileCallback);

    const passwordEmailContent = ElasticEmail.EmailMessageData.constructFromObject({
      // Recipients: [new ElasticEmail.EmailRecipient('golden.peach.ts@gmail.com')],
      Recipients: [new ElasticEmail.EmailRecipient(supportEmail)],
      Content: {
        Body: [
          ElasticEmail.BodyPart.constructFromObject({
            ContentType: "HTML",
            Content: password,
          }),
        ],
        Subject: subject,
        From: elasticEmailConfig.auth.kycEmail,
      },
    });

    const passwordCallback = (error, data, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Password was sent Successfully!");
      }
    };

    api.emailsPost(passwordEmailContent, passwordCallback);

  } catch (error) {
    console.error("Failed to send email:", error);
    throw error; // Rethrow to handle further up the call stack
  }
}

export const kycSubmit = async (req, res) => {

  const { id } = req.params;
  const { name } = req.body;

  try {
    const id_card = req.files['idcard'];
    const selfie = req.files['selfie'];
    const user = await User.findByPk(id); // Assuming 'id' is sent in the request body

    if (!user) {
      return res.status(404).send({
        message: "User not Found!"
      })
    }

    await user.update({
      name,
      contract: {
        status: "pending"
      }
    });

    await sendEmail(user, { id_card, selfie }, 'support@lockleaks.com', `KYC Submission - ${user.email}`, `KYC Submission - ${name}`);

    io.emit(`new_kyc_submitted`, user);

    return res.status(200).send({ message: "Data Submitted Successfully!" });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const handleKYCSubmission = async (req, res) => {

  const { id } = req.params;
  const { decision, message } = req.body;

  try {

    const user = await User.findByPk(id);

    let emailBodyContent = {
      title: "",
      content: ""
    }

    if (!user) {
      return res.status(404).send({
        message: "User not Found!"
      })
    }

    if (decision == 'decline') {

      await user.update({
        contract: {
          status: `declined`,
          reason: message
        }
      });

      emailBodyContent = {
        title: "KYC Verification Declined",
        content: `<h4>Dear ${user.name}</h4>
        <br />
        <p>We regret to inform you that your KYC verification has been declined. Unfortunately, we cannot proceed with your account verification due to the following reason:</p>
        <br />
        <p>Reason for denial: <strong>${message}</strong></p>
        <br />
        <p>Please review the information provided and submit the correct documentation if you wish to attempt the verification process again.</p>
        <br />
        <p>If you have any questions or need further assistance, please do not hesitate to contact our support team.</p>
        <br />
        <p>Best regards,</p>
        <p>Lock Leaks</p>`
      }

    }

    if (decision == 'approve') {
      await user.update({
        contract: {
          status: `approved`,
          date: new Date()
        }
      });

      emailBodyContent = {
        title: "KYC Verification Successful",
        content: `<h4>Dear ${user.name}</h4>
        <br />
        <p>We are pleased to inform you that your KYC verification has been successfully completed. You now have full access to our services.</p>
        <br />
        <p>You can now use your dashboard and all features available on our platform.</p>
        <br />
        <p>Thank you for your cooperation.</p>
        <br />
        <p>Best regards,</p>
        <p>Lock Leaks</p>`
      }

    }

    const emailContent = ElasticEmail.EmailMessageData.constructFromObject({
      Recipients: [new ElasticEmail.EmailRecipient(user.email)],
      Content: {
        Body: [
          ElasticEmail.BodyPart.constructFromObject({
            ContentType: "HTML",
            Content: emailBodyContent.content,
          }),
        ],
        Subject: emailBodyContent.title,
        From: elasticEmailConfig.auth.kycEmail,
      },
    });

    const callback = (error, data, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email was sent Successfully!");
      }
    };

    api.emailsPost(emailContent, callback);


    io.emit(`kyc_decided_${id}`, user.contract);

    return res.status(200).send({
      message: "Contract Status updated Successfully!"
    })

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }

}

export const uploadCopyrightHolder = async (req, res) => {

  const { id } = req.params;

  try {

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({
        message: "User not Found!"
      })
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send({ message: "No files were uploaded." });
    }

    const file = req.files.file;

    const filePath = path.join(`./uploads/copyright_holder/copyright_holder_${id}.pdf`);

    await file.mv(filePath);

    await user.update({
      copyright_holder: `copyright_holder_${id}.pdf`
    });

    io.emit(`copyright_holder_uploaded_${id}`, `copyright_holder_${id}.pdf`);

    res.send({
      message: "File uploaded successfully!"
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err.message
    });
  }
}

export const downloadCopyrightHolder = async (req, res) => {

  const { id } = req.params;

  try {

    const filePath = path.join(`./uploads/copyright_holder/copyright_holder_${id}.pdf`);

    res.download(filePath);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}