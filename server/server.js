import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
import forcesRoutes from './routes/forcesRoutes.js'
import codeRoutes from './routes/codeRoutes.js'

// config dotenv
dotenv.config()

// mongoDB connect
connectDB();

const app = express();

// middlewares
app.use(cors())
app.use(express.json())

// routes
app.use('/server/v1/auth', authRoutes);
app.use('/server/v1/forces', forcesRoutes);
app.use('/server/v1/code', codeRoutes);

app.get('/', (req, res) => {
    res.send('lolxzzzz')
})



const PORT = process.env.PORT || 8000

// run/listen
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`)
})