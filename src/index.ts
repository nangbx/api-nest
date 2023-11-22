import 'reflect-metadata';
import Koa from 'koa';

import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';
import bodyParser from 'koa-bodyparser';

import cors from '@koa/cors';

import * as admin from 'firebase-admin';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import koaRequest from 'koa-http-request';

admin.initializeApp({
  credential: admin.credential.cert('firebase-key.json'),
  databaseURL: 'https://siot-hust.firebaseio.com',
});

import routers from './routers';

dotenv.config();

const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(koaRequest());

createConnection()
  .then(async (connection) => {
    console.log('database connected');

    app.use(routers());
    app.listen(process.env.PORT || 5000);

    console.log('Server running on port ' + (process.env.PORT || 5000));
  })
  .catch((error) => console.log('Error:', error));
