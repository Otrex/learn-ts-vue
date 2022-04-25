import express from 'express';
import authenticationRoute from './Authentication';

const app = express();

app.use('/', authenticationRoute);

app.listen(3000, () => { console.log("working"); })
