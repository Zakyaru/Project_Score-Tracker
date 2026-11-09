import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();
const port = 3005;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok2' });
});

app.listen(port, () => {
  console.log(`server is listening on port : ${port}`);
});
