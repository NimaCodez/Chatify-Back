import { Config } from '@fullstacksjs/config';
import { configDotenv } from 'dotenv';
import { join } from 'path';
configDotenv({ path: join(process.cwd(), '.env') });

const dbConfigurationSchema = new Config({
  host: Config.string().required(),
  port: Config.number().required(),
  user: Config.string().required(),
  password: Config.string().required(),
  name: Config.string().required(),
});

export const dbConfig = dbConfigurationSchema.parse({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
});

const appConfigurationSchema = new Config({
  port: Config.number().required(),
  appHost: Config.string().required(),
  apiDocsRoute: Config.string().required(),
});

export const appConfig = appConfigurationSchema.parse({
  port: process.env.PORT,
  appHost: process.env.APP_HOST,
  apiDocsRoute: process.env.API_DOCS_ROUTE,
});

const bcryptConfigSchema = new Config({
  salt: Config.number().required(),
})

export const bcryptConfig = bcryptConfigSchema.parse({
  salt: process.env.BCRYPT_SALT_ROUND
})