import express from 'express';
const app = express();


import { user_router } from './user/router/user_router.js';

app.use('/user', user_router)


export const app_router = app;