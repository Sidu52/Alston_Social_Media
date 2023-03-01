const nodeMailer = require('../config/nodemailer');

exports.verification= (email, otp)=>{
    console.log(email)
    let htmlString = nodeMailer.renderTemplate({ otp: otp }, '/Emailverification/emailverified.ejs')
    nodeMailer.transporter.sendMail({
        from: 'alstonsid9@gmail.com',
        to: email,
        subject: "Email verification",
        html: htmlString
    }, (err, info) => {
        if (err) { console.log("Error in sending mail ", err); return; }
        console.log('Message sent', info)
    });
}