const express = require('express')
const mongoose = require('mongoose')
const workRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

require('dotenv').config()
const cors = require('cors')

const app = express()

// middleware
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workRoutes)
app.use('/api/user', userRoutes)


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        const port = process.env.PORT || 4000
        app.listen(port, () => {
            console.log(`listening on port ${port}!!!`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
