const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const deviceRoutes = require('./routes/devices');
const networkRoutes = require('./routes/network'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Swagger definition
const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // OpenAPI version
        info: {
            title: 'Network Management System API',
            version: '1.0.0',
            description: 'API documentation for the Network Management System',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(express.json());

// Kết nối với MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Use device and network routes
app.use('/api/devices', deviceRoutes);
app.use('/api/network', networkRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
