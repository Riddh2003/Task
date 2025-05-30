const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
app.use(express.json());

const validateToken = require("./src/middleware/AuthMiddleware.js");
app.use((req, res, next) => {
    const publicRoutes = ["/api/auth/login", "/api/auth/register"];
    if (publicRoutes.includes(req.path)) {
        return next();
    }

    validateToken(req, res, next);
})

const authRoutes = require('./src/routes/AuthRoutes.js');
app.use('/api/auth', authRoutes);

const projectRoutes = require('./src/routes/ProjectRoutes.js');
app.use('/api/projet', projectRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => {
    console.log('MongoDB Connted....')
}).catch(() => {
    console.log('MongoDB not connected....')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
