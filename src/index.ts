import express from 'express';

const app = express();
const port = 3000
const hostname = 'http://localhost'

app.use(express.json());

app.get('/', (req, res) => {
  res.send('tt-nk-test')
})

app.listen(port, () => {
  console.log(`Server is running on ${hostname}:${port}`);
});
