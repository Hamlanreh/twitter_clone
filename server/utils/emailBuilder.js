const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

class Email {
  constructor(user, url) {
    this.from = `Oluwabi Ahmed ${process.env.EMAIL_FROM}`;
    this.to = user.email;
    this.url = url;
    this.firstName = user.firstname;
  }

  createTransporter() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(title, subject, template) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      title,
      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };

    await this.createTransporter().sendMail(mailOptions);
  }

  async sendResetPassword() {
    await this.send(
      'Twitter Clone Account Reset Password',
      'Reset Password For Twitter Clone Account 👌💯',
      'resetPassword'
    );
  }

  async sendDeactivateAccount() {
    await this.send(
      'Deactivate Your Account',
      'Your account has been deactivated, we hope to see you soon bruh 😢😭😢😢😢',
      'deactivate'
    );
  }
}

module.exports = Email;
