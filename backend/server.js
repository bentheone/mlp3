require('dotenv').config();
const express = require('express');8
const app = express();
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);

sequelize.sync(/*{force: true}*/).then(() => {
    console.log('Database synced!');
    app.listen(5000, () => {
        console.log(`Server running on port 5000`);
    })
}).catch((err) => {
    console.error('DB Connection Failed:', err.message);
});