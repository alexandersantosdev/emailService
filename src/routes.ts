import { Router } from 'express';
import { EmailController } from './emailController.js';

class EmailRouter {
  public router;

  constructor(private emailController: EmailController) {
    this.router = Router();
  }

  async init(): Promise<void> {
    this.router.post('/api/email', this.emailController.sendEmail);
  }

}

export { EmailRouter };
