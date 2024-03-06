const express = require('express');
const cors = require('cors');
require('dotenv').config();
const okresesRoutes = require('./routes/okresesRoutes');
const okresRoutes = require('./routes/okresRoutes');
const generatePdfRoutes = require('./routes/generatePdfRoute');


const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3001', // frontend port
}));

app.use('/api', okresesRoutes);
app.use('/api', okresRoutes);
app.use('/api', generatePdfRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
