import mysql, { Connection } from 'mysql2/promise';
import { DATABASE_HOST, DATABASE_USER, DATABASE_PASS, DATABASE } from './config';

export class database {
  private static instance: database;
  private connection: Connection | null;

  private constructor() {
    this.connection = null;
  }

  public static getInstance(): database {
    if (!database.instance) {
      database.instance = new database();
    }
    return database.instance;
  }

  public async connect(): Promise<void> {
    this.connection = await mysql.createConnection({
        host: DATABASE_HOST,
        user: DATABASE_USER,
        password: DATABASE_PASS,
        database: DATABASE
    });

    console.info('Connected to database');
  }

  public getConnection(): Connection {
    if (!this.connection) {
      throw new Error('Database connection not established');
    }
    return this.connection;
  }

  public async closeConnection(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
      console.info('Database connection closed');
    }
  }
}
