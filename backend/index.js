import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './models/db.js';
import authrouter from './routers/auth_routers.js';
import userRouter from './routers/userRoute.js';
import productsRouter from './routers/produtsRouter.js';


dotenv.config();
const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Waris server is ready!')
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [
    'http://localhost:5173', // Development
    'https://signupmern-git-main-waris-alis-projects-2c1a53d2.vercel.app/',
    'https://signupmern.vercel.app/',
    'signupmern.vercel.app/',
    // Production
  ],
  credentials: true
}));

app.use('/api', userRouter);
app.use('/auth', authrouter);
app.use('/products', productsRouter);

//app.use('/products', productsRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

