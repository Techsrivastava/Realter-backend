const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://adarsh00761:4JIwxX3JBQny5uVB@cluster0.l3cqhay.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: { w: 'majority' }, 
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

module.exports = mongoose;
