import { declareQueue } from './subscriber';
import { QUEUE_NAME } from '../../../external/constants/job_name';
import { UserElasticsearch } from '../../../server/server';

// TODO Add Element To ElasticSearch
export const elasticsearchAddElement = async (channel) => {
  const q = await declareQueue(QUEUE_NAME.ELASTICSEARCH_CREATE, channel, true)
  try {
    channel.consume(q, (msg) => {
      const data = JSON.parse(msg.content.toString());
      UserElasticsearch.AddElement(data.index, data.data, '');
    }, {
      noAck: true
    });
  } catch (error) {
    console.error(error);
  }
}

// TODO Update Element To ElasticSearch
export const elasticsearchUpdateElement = async (channel) => {
  try {
    const q = await declareQueue(QUEUE_NAME.ELASTICSEARCH_UPDATE, channel, true)
    channel.consume(q, (msg) => {
      const data = JSON.parse(msg.content.toString())
      UserElasticsearch.UpdateAndInsert(data.index, data.data, false, '')
    }, {
      noAck: true
    })
  } catch (error) {
    console.error(error);
  }
}

// TODO Remove Element To ElasticSearch
export const elasticsearchDeleteElement = async (channel) => {
  try {
    const q = await declareQueue(QUEUE_NAME.ELASTICSEARCH_REMOVE, channel, true)
    channel.consume(q, (msg) => {
      const data = JSON.parse(msg.content.toString())
      UserElasticsearch.DeleteElement(data.index, data.id, '')
    }, {
      noAck: true
    })
  } catch (error) {
    console.error(error);
  }
}
