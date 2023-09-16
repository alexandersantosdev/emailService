import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { EmailController } from './emailController.js';
import { EmailRouter } from './routes.js';
import NodeMailerImpl from './nodeMailerImpl.js';

import swaggerUi from 'swagger-ui-express';

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const swaggerFile = require('../swagger_output.json')

config();

const app = express();

const emailImpl = new NodeMailerImpl();
const emailController = new EmailController(emailImpl);
const emailRouter = new EmailRouter(emailController);

emailRouter.init();

app.use(cors());
app.use(express.json());
app.use(emailRouter.router);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  const message = err.message || err.cause;
  res.status(400);
  res.json({ error: message });
  next(err);
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

