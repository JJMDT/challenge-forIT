
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const taskRoutes = require('./routes/taskRoutes')

dotenv.config();
const app = express();
const PORT = process.env.PORT ;
const HOST = process.env.HOST ;


app.use(express.json());

app.use(cors({
    origin:'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))


app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Task Manager API',
    })
}
)


app.listen(PORT, HOST, () => {
    console.log(`Server running http://${HOST}:${PORT}`);
})

