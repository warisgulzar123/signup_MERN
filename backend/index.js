import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import './models/db.js';
import authrouter from './routers/auth_routers.js';

dotenv.config();
const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/auth', authrouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
