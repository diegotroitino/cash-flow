import express from 'express';
import router from './router';
import { PORT_HTTP } from './sys/config';

const app = express();

app.use(express.json());

app.use(router);

// Inicia o servidor
app.listen(PORT_HTTP, () => {
  console.log(`API running at port ${PORT_HTTP}`);
});
