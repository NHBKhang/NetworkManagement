const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');
const deviceRoutes = require('./routes/devices');
const networkRoutes = require('./routes/network');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Cấu hình middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/devices', deviceRoutes);
app.use('/api/network', networkRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
