require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const candidateRoutes = require('./routes/candidates');
const jobRoutes       = require('./routes/jobs');
const adminRoutes     = require('./routes/admin');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/candidates', candidateRoutes);
app.use('/api/jobs',       jobRoutes);
app.use('/api/admin',      adminRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
