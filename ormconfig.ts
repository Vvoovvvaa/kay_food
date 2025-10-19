import * as path from 'path';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
// import {
//   addTransactionalDataSource,
//   initializeTransactionalContext,
// } from 'typeorm-transactional';

import * as ENTITIES from '@app/common/database/entities';

const envFile = path.resolve(__dirname, '.env');

dotenv.config({
  path: envFile,
});

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [...Object.values(ENTITIES)],
  migrationsTableName: 'mindgrid_migrations',
  migrations: ['./libs/common/src/database/migrations/*.ts'],
});

// initializeTransactionalContext();
// addTransactionalDataSource(dataSource);