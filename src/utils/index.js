const Datauri = require('datauri');
const path = require('path');

const cloudinary = require('../config/cloudinary');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function uploader(req) {
    return new Promise((resolve, reject) => {
        const dUri = new Datauri();
        let image = dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

        cloudinary.uploader.upload(image.content, (err, url) => {
            if (err) return reject(err);
            return resolve(url);
        })
    });
}

function sendEmail(mailOptions) {
    sgMail.send(mailOptions)
  .then(() => {
    console.log(mailOptions)
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
   
    // return new Promise((resolve, reject) => {
    //     sgMail.send(mailOptions, (error, result) => {
    //         console.log(resolve,reject)
    //         if (error) return reject(error);
    //         return resolve(result);
    //     });
    // });
}

module.exports = { uploader, sendEmail };