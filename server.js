const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Bucket List';


app.post('/ideas', (request, response) => {
  const info = request.body;
  console.log(info);

  for (let requiredParameter of ['title', 'body']) {
    if (!info[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { title: <String>, body: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('ideas').insert(info, 'id')
    .then(idea => {
      response.status(201).json({id: idea[0] })
    })
    .catch(err => response.status(500).json({ err }));
})












app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})