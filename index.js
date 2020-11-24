'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Contact = require('./modules/contact');

app.use(express.json());
app.use(express.static('build'));
app.use(cors());

// fomatting the log printed
const format = `
    :method
    :url
    :status
    :res[content-length] -
    :response-time ms
    :content
    `;

morgan.token('content', (request) => {
  return JSON.stringify(request.body);
})
app.use(morgan(format));

// let persons = [
//   {
//     "name": "Arto Hellas",
//     "number": "040-123456",
//     "id": 1
//   },
//   {
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523",
//     "id": 2
//   },
//   {
//     "name": "Dan Abramov",
//     "number": "12-43-234345",
//     "id": 3
//   },
//   {
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122",
//     "id": 41
//   }
// ];

app.get('/api/persons', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts);
  })
});

app.get('/info', (request, response) => {
  const num = persons.length;
  const num_text = `<div>Phonebook has info for ${num} people<div><br>`;
  const [
    day,
    date,
    month,
    fullYear,
    h,
    m,
    s,
    timeDiff
  ] = _getFullDate();
  const date_text = `<div>${day} ${month} ${date} ${fullYear}
    ${h}:${m}:${s} GMT${timeDiff > 0 ? '+' : ''}${timeDiff} (Eastern European
    Standard Time)</div>`;
  const text = num_text + date_text;

  response.send(text);
});

const _getFullDate = () => {
  const timestamp = new Date();
  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
  const day = days[ timestamp.getDay() ];
  const date = timestamp.getDate();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const month = months[ timestamp.getMonth() ];
  const fullYear = timestamp.getFullYear();
  const h = timestamp.getHours();
  const m = timestamp.getMinutes();
  const s = timestamp.getSeconds();
  const timeDiff = timestamp.getTimezoneOffset()*-1/60;
  return [
    day,
    date,
    month,
    fullYear,
    h,
    m,
    s,
    timeDiff
  ];
}

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(p => p.id === id);

  if(person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(p => p.id !== id);

  response.status(204).end();
})

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if(!body.name) {
    return response.status(400).json({
      error: 'name is missing'
    })
  } else if (!body.number) {
    return response.status(400).json({
      error: 'number is missing'
    })
  }

  const names = persons.map(p => p.name);
  if( names.includes(body.name) ) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: _generateId(),
  }

  persons = persons.concat(newPerson);
  response.json(newPerson);
})

const _generateId = () => {
  const maxId = persons.length > 0
  ? Math.max(...persons.map(p => p.id))
  : 0

  return maxId + 1;
}

const PORT = process.env.PORT;
app.set("port", PORT);
app.listen(PORT, () => {
  console.log(`Web server is running on port ${PORT}`);
})
