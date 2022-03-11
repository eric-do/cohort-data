import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello world');
});

router.post('/', (req, res) => {
  res.status(201).send('Hello world');
});

export default router;