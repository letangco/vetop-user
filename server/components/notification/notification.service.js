import { QUEUE_NAME, NOTIFICATION_TYPE, BODY_FCM, TITLE_FCM } from "../../../external/constants/job_name";
import { error500 } from "../../../external/util/error";
import { sendDataToQueue } from '../../../internal/rabbitmq/publisher/publisher';
import { Rabbitmq } from '../../server';

export async function sendNotification(data) {
    try {
      const options = {
        type: data.type,
        to: data.to,
        targetId: data.targetId,
      }
      if (data.data) {
        options.data = data.data;
      }
      switch (data.type) {
        case NOTIFICATION_TYPE.INVITE_STAFF_TO_STORE:
          options.title = TITLE_FCM.STORE_NOTIFICATION;
          options.body = BODY_FCM.INVITE_STAFF_TO_STORE;
          break;
        case NOTIFICATION_TYPE.ACCEPT_STORE_INVITE:
          options.title = `${TITLE_FCM.STAFF_REPLY_INVITE} ${data.data.sender}`;
          options.body = `${data.data.sender} ${BODY_FCM.ACCEPT_STORE_INVITE}`;
          break;
        case NOTIFICATION_TYPE.REJECT_STORE_INVITE:
          options.title = `${TITLE_FCM.STAFF_REPLY_INVITE} ${data.data.sender}`;
          options.body = `${data.data.sender} ${BODY_FCM.REJECT_INVITE_STORE}`;
          break;
        case NOTIFICATION_TYPE.USER_FOLLOW_STORE:
          options.title = `${TITLE_FCM.USER_FOLLOW_STORE} ${data.data.sender}`;
          options.body = `${data.data.sender} ${BODY_FCM.FOLLOW_STORE}`;
          break;
        case NOTIFICATION_TYPE.USER_UNFOLLOW_STORE:
          options.title = `${TITLE_FCM.USER_FOLLOW_STORE} ${data.data.sender}`;
          options.body = `${data.data.sender} ${BODY_FCM.UNFOLLOW_STORE}`;
          break;
        case NOTIFICATION_TYPE.REGISTER_ACCOUNT:
          options.title = `${TITLE_FCM.REGISTER_ACCOUNT}`;
          options.body = `${BODY_FCM.REGISTER_ACCOUNT}${data.data.code}`;
          break;
        case NOTIFICATION_TYPE.REGISTER_STORE:
          options.title = `${TITLE_FCM.REGISTER_STORE}`;
          options.body = `${BODY_FCM.REGISTER_STORE}${data.data.name}`;
          break;
        default:
          break;
      }
      if (options.to) {
        sendDataToQueue(Rabbitmq.getChannel(), QUEUE_NAME.CREATE_NOTIFICATION, options)
      }
    } catch (error) {
      return error500(error);
    }
  }
