import mongoose from 'mongoose';
import app from './api/app';
import { MONGO_URI, SERVER_PORT, RABBITMQ_URI, ELASTICSEARCH_HOST, ELASTICSEARCH_PORT } from './config';
import logger from './api/logger';
import dummySomeData from '../internal/mongo/dummySomeData';
import initUploadFolders from './util/InitFolders';
import rabbitMq from '../internal/rabbitmq/rabbitmq';
import Elasticsearch from '../internal/elasticsearch/elasticsearch';
import { UserPayload } from '../external/elasticsearch/user/user';
import { ProductsPayload } from '../external/elasticsearch/product/product';
import { StorePayload } from '../external/elasticsearch/store/store';
import cronJob from './libs/cron';

// export const Rabbitmq = new rabbitMq(RABBITMQ_URI);
export const UserElasticsearch = new Elasticsearch({
  host: ELASTICSEARCH_HOST,
  port: ELASTICSEARCH_PORT
});

initUploadFolders();
// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}).then(async () => {
  logger.info('Mongodb connected');
  // await Rabbitmq.init();
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local') {
    dummySomeData().catch((error) => {
      console.error('dummySomeData error');
      console.error(error);
    });
  }
}).catch((error) => {
  console.log(error);
  logger.error('Please make sure Mongodb is installed and running!');
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

app.listen(SERVER_PORT, async (error) => {
  if (error) {
    logger.error('Cannot start backend services:');
    logger.error(error);
  } else {
    // await UserElasticsearch.DeployMultiDocument([UserPayload, ProductsPayload,  StorePayload]);
    // cronJob();
    logger.info(`Backend service is running on port: ${SERVER_PORT}${process.env.NODE_APP_INSTANCE ? ` on core ${process.env.NODE_APP_INSTANCE}` : ''}!`);
  }
});

export default app;
