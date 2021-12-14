import express from 'express';
import authRouter from './routes/auth';
import taskRouter from './routes/task';
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT
const app = express()

app.use('/', authRouter)
app.use('/v1', taskRouter)

app.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`App started on port ${port}`);
});