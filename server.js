import express from 'express';
import dotenv from 'dotenv';
import db from './database/connect';
import errorHandler from './middlewares/errorHandling';
import superAdmin from './dbSeed/superAdmin';
import config from './config/app-config';
import router from './routes/index';
import logger from './utils/logger';

dotenv.config();

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

// <------------😉------------> using error handling middleware <------------😉------------>
app.use(errorHandler);

// <------------😉------------> Listening Server <------------😉------------>
db.sequelize.sync({ force: config.force, alter: config.alter }).then(() => {
  app.listen(PORT || 5000, () => {
    logger.info(`Server is running on PORT: ${PORT} ...`);
  });

  // calling superAdmin seeder...
  if (config.force === true) {
    superAdmin();
  }
});
