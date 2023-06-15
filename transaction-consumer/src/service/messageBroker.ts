import { Kafka } from 'kafkajs';
import { MESSAGE_BROKER_HOST } from '../sys/config';

const kafka = new Kafka({ brokers: [MESSAGE_BROKER_HOST], clientId: 'cash-flow' });

let consumer = kafka.consumer({ groupId: 'storage-group' });

type TMessage = {
  topic: string,
  offset: string,
  timestamp: string,
  key: string,
  value: any
}

type TMessageHandler = (message: TMessage) => any

export const subscribe = async (topic: string, callback: TMessageHandler) => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({

    eachMessage: async ({ topic, partition, message }) => {
      callback({
        topic,
        offset: message.offset,
        timestamp: message.timestamp,
        key: message.key?.toString() || '',
        value: JSON.parse(message.value?.toString() || '{}'),
      });

    },
  })
}

