import { MessageBody } from "./messageBody.js";

interface EmailService {
  sendEmail(messageBody: MessageBody): Promise<string>;
}

export { EmailService };
