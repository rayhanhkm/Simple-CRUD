const express = require('express');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/noteRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.APP_PORT ;

// Middleware
app.use(bodyParser.json());
app.use('/api', noteRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});