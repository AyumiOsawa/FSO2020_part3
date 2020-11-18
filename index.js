'use strict';
const express = require('express');
const app = express();

const persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 41
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons);
})

app.get('/info', (request, response) => {
  const num = persons.length;
  const num_text = `<div>Phonebook has info for ${num} people<div><br>`;
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
  const date_text = `<div>${day} ${month} ${date} ${fullYear}
    ${h}:${m}:${s} GMT${timeDiff > 0 ? '+' : ''}${timeDiff} (Eastern European 
    Standard Time)</div>`;
  const text = num_text + date_text;

  response.send(text);
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Web server is running on port ${PORT}`);
})
