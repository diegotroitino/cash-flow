import { Kafka } from 'kafkajs';
import { MESSAGE_BROKER_HOST } from './config';

const kafka = new Kafka({ brokers: [MESSAGE_BROKER_HOST], clientId: 'cash-flow' });

const producer = kafka.producer();


type TProduceResult = {
    success: boolean,
    error?: string
}

export const produce = async (data: any, topic: string): Promise<TProduceResult> => {
    const payload = {
        topic: topic,
        messages: [
            { value: JSON.stringify(data) }
        ]
    };
    
    await producer.connect();

    return await producer.send(payload)
        .then(response => {
            if (response[0].errorCode > 0) {
                console.error('Error to send message to broker', response);
                return { success: false, error: 'Error to send message to broker' };
            }
            else {
                return { success: true };
            }
        });
}