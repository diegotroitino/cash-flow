import { subscribe } from "./service/messageBroker";

subscribe('transactions', (message) => {
    console.log(message);
})