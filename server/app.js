import express from 'express';
import bodyParser from 'body-parser';
import eventsRouter from './routes/events';

const port = process.env.PORT || 5009;

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to Armoury Manager' });
});
app.use('/api/v1/events', eventsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ error: 'Invalid Route' });
});

app.listen(port, () => {
  console.log(`Armoury Manager started on port ${port}.`);
});

export default app;
