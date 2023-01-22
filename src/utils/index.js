const Datauri = require('datauri');
const path = require('path');

const cloudinary = require('../config/cloudinary');
var nodemailer = require('nodemailer');


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
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'badabolaji@gmail.com',
      pass: 'winiagbfwrdoedev'
    }
  });

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
   
    // return new Promise((resolve, reject) => {
    //     sgMail.send(mailOptions, (error, result) => {
    //         console.log(resolve,reject)
    //         if (error) return reject(error);
    //         return resolve(result);
    //     });
    // });
}

module.exports = { uploader, sendEmail };