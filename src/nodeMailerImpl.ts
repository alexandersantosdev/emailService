import nodemailer from 'nodemailer';
import { MessageBody } from './messageBody.js';
import { EmailService } from './emailServiceInterface.js';

class NodeMailerImpl implements EmailService {
  async sendEmail(messageBody: MessageBody): Promise<string> {

    const errors = [];
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    if (!messageBody.from) errors.push(`The field 'from' is required`);
    if (!messageBody.to) errors.push(`The field 'to' is required`);
    if (!messageBody.subject) errors.push(`The field 'subject' is required`);
    if (!messageBody.body) errors.push(`The field 'body' is required`);
    if (!reg.test(messageBody.from)) errors.push(`The email 'from' is not a valid email`);
    if (!reg.test(messageBody.to)) errors.push(`The email 'to' is not a valid email`);
    if (errors.length > 0) throw new Error(errors.join(', '));

    try {
      const transport = nodemailer.createTransport({
        name: process.env.EMAIL_SETTINGS_USER,
        host: process.env.EMAIL_SETTINGS_HOST,
        port: Number(process.env.EMAIL_SETTINGS_PORT),
        secure: Number(process.env.EMAIL_SETTINGS_PORT) == 465 ? true : false,
        auth: {
          user: process.env.EMAIL_SETTINGS_USER,
          pass: process.env.EMAIL_SETTINGS_PASS
        }
      });

      const emailObj = {
        from: messageBody.from,
        to: messageBody.to,
        subject: messageBody.subject,
        html: messageBody.body
      };

      await transport.sendMail(emailObj);
      return "Email sent successfully";
    } catch (error) {
      const message = error.message || error;
      throw new Error(message);
    }

  }

}

export default NodeMailerImpl;
