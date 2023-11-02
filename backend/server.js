import express from 'express';
import data from './data.js';

const app = express();
app.get('/api/courses', (req, res) => {
  res.send(data.courses);
});

app.get('/api/courses/code/:code',(req,res) => {
  const course = data.courses.find((x) => x.code === req.params.code);
  if(course){
    res.send(course);
  }
  else {
    res.status(404).send({message: 'Product Not Found'});
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});