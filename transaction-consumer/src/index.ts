import { subscribe } from "./service/messageBroker";
import { transaction } from "./service/transaction";
import { database } from "./sys/database";

database.startDatabase().then(() => {
    subscribe('transactions', (message) => {
        const service = new transaction();


        service.save({
            type: message.value.type,
            amount: message.value.amount,
            description: message.value.description,
            user_id: message.value.user_id,
            date: new Date()
        })

        console.log(message);

    })
});