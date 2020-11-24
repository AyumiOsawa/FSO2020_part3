const mongoose = require('mongoose');

const dbUrl = process.env.MONGODB_URI;
console.log(`try connecting to ${dbUrl}...`);

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(result => {
  console.log('connected to the database');
})
.catch(error => {
  console.log('error in connecting to the database:', error.message);
});

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

contactSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
})

module.exports = mongoose.model('Contact', contactSchema);
