import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.send('Hello World');
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
