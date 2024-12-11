import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import models from './models/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1]
  };
  next();
});

app.get('/session', (req, res) =>
  res.send(req.context.models.users[req.context.me.id])
);

app.get('/users', (req, res) =>
  res.send(Object.values(req.context.models.users))
);

app.get('/users/:userId', (req, res) =>
  res.send(req.context.models.users[req.params.userId])
);

app.get('/messages', (req, res) =>
  res.send(Object.values(req.context.models.messages))
);

app.get('/messages/:messageId', (req, res) =>
  res.send(req.context.models.messages[req.params.messageId])
);

app.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});

app.delete('/messages/:messageId', (req, res) => {
  const { [req.params.messageId]: message, ...otherMessages } =
    req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
