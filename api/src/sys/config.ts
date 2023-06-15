import dotenv from 'dotenv'
dotenv.config();

export const VERSION = process.env.npm_package_version

export const PORT_HTTP = process.env.PORT_HTTP || 3000

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'b4dff096-6860-40e9-be53-ab0f65403eca'
export const MESSAGE_BROKER_HOST = process.env.MESSAGE_BROKER_HOST || 'kafka:9092'

export const DATABASE_HOST = process.env.DATABASE_HOST || 'mysql'
export const DATABASE_USER = process.env.DATABASE_USER || 'root'
export const DATABASE_PASS = process.env.DATABASE_PASS || 'secret_password'
export const DATABASE = process.env.DATABASE || 'cashflowdb'
