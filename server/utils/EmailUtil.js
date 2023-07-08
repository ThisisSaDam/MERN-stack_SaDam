 // CLI : npm install nodemailer --save
const nodemailer = require('nodemailer') ;
const myConstants = require ('./MyConstants') ;
const transporter = nodemailer.createTransport ({
  service: 'hotmail ',
  auth: {
    user: myConstants.EMAIL_USER,
    pass: myConstants.EMAIL_PASS
  }
});
const EmailUtil = {
  send(email, id, token) {
    const text = 'Thanks for signing up , please input these informations to activate your account :\n\t .id: ' + id + '\n\t .token: ' + token;
    return new Promise(function(resolve , reject) {
      const mailOptions = {
        from: myConstants.EMAIL_USER ,
        to: email ,
        subject: 'Signup | Verification ',
        text: text
      };
      transporter.sendMail(mailOptions, function(err, result) {
        if(err) reject(err);
        resolve(true);
      });
    });
  }
};
module.exports = EmailUtil;
