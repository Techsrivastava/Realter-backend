const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); 
const typeRoutes = require('./routes/typeRoutes');
const referralRoutes = require('./routes/referralRoutes');
const notificationRoutes = require('./routes/notificationRoutes'); 
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
// Serve static files from the 'public' directory
app.use( express.static('public'));

// Middleware
app.use(express.json());
// Use the cors middleware to enable CORS for all routes
app.use(cors());
app.use(express.urlencoded({ extended: false }));




// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes); 
app.use('/properties', propertyRoutes);
app.use('/categories', categoryRoutes); 
app.use('/types', typeRoutes); 
app.use('/referral', referralRoutes); 
app.use('/notifications', notificationRoutes);

// Start the server
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


