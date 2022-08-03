/* eslint-disable import/no-cycle */
import { searchCodeTracking } from '../components/user/user.service';

const cron = require('node-cron');

export default async function cronJob() {
  // Interest each day
  cron.schedule('*/1 * * * *', async () => {
    await searchCodeTracking();
  }, {
    scheduled: true,
    timezone: 'Asia/Bangkok'
  });
}
