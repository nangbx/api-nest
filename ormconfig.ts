const SOURCE_PATH = process.env.NODE_ENV === 'production' ? 'dist' : './src'

module.exports = [{
   type: process.env.DATABASE_CONNECTION,
   host: process.env.DATABASE_HOST,
   port: process.env.DATABASE_PORT,
   username: process.env.DATABASE_USERNAME,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE_NAME,
   synchronize: false,
   logging: false,
   dropSchema: false,
   extra: {
      ssl: true
   },
   entities: [
      `${SOURCE_PATH}/entities/**/*{.ts,.js}`
   ],
   migrations: [
      `${SOURCE_PATH}/migrations/**/*{.ts,.js}`
   ],
   subscribers: [
      `${SOURCE_PATH}/subscribers/**/*{.ts,.js}`
   ],
   cli: {
      entitiesDir: `${SOURCE_PATH}/entities`,
      migrationsDir: `${SOURCE_PATH}/migrations`,
      subscribersDir: `${SOURCE_PATH}/subscribers`,
   }
}, {
   name: 'seed',
   type: process.env.DATABASE_CONNECTION,
   host: process.env.DATABASE_HOST,
   port: process.env.DATABASE_PORT,
   username: process.env.DATABASE_USERNAME,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE_NAME,
   synchronize: false,
   logging: true,
   dropSchema: false,
   extra: {
      ssl: true
   },
   migrations: [
     `${SOURCE_PATH}/seeds/*{.ts,.js}`
   ],
   cli: {
     migrationsDir: `${SOURCE_PATH}/seeds`,
   }
 }]
