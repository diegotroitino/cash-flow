import dotenv from 'dotenv'
dotenv.config();

export const VERSION = process.env.npm_package_version

export const MESSAGE_BROKER_HOST = process.env.MESSAGE_BROKER_HOST || 'kafka:9092'