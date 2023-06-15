import express from 'express'
import controllerHealthCheck from '../controller/healthCheck';
import controllerTransactions from '../controller/transactions';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../sys/swagger_output.json';

const router = express.Router()

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
router.use(controllerHealthCheck);
router.use(controllerTransactions);

export default router;