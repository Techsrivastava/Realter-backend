const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://adarsh00761:WDdQBfS2YEbQvAbB@cluster0.9fzy8t2.mongodb.net/?retryWrites=true&w=majority/get121', {
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
