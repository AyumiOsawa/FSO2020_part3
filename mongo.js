const mongoose = require('mongoose');

if(process.argv.length < 3)  {
  console.log('Provide password, or password, name, number');
  process.exit(1);
} else if (process.argv.leength === 4) {
  console.log('Either name or number is missing');
  process.exit(1);
} else if (process.argv.length > 5) {
  console.log('too many arguments!');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://ayumi:${password}@cluster0.o0lbt.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
);

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model('Contact', contactSchema);

if (name && number) {
  const contact = new Contact({
    name: name,
    number: number
  });

  contact.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  })
} else {
  Contact.find({}).then(contacts => {
    console.log('phonebook');
    contacts.forEach(contact => {
      console.log(contact.name, contact.number);
    })
    mongoose.connection.close();
  })
}
