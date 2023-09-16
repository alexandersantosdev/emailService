import { Request, Response } from "express";
import { EmailService } from "./emailServiceInterface.js";

type SendMailResponse = {
  message: string;
}

class EmailController {

  constructor(private emailService: EmailService) { }

  sendEmail = async (req: Request, res: Response): Promise<Response<SendMailResponse>> => {
    const response = await this.emailService.sendEmail(req.body);
    return res.json({ message: response });
  }

}

export { EmailController };
