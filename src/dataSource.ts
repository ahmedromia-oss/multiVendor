import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DBhost,
  username: process.env.DBuser,
  password: process.env.DBpassword,
  database: process.env.database,
  port: Number(process.env.DBport),

  entities: ['dist/src/**/*.model.js'],
  migrations: ['dist/src/migrations/*.js'],

  synchronize: false,
  extra: {
    ssl: false,
  },
});