const express = require('express')
const cors = require('cors')
const database = require('./database/database')

const app = express()

//Middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', require('./routes/api.routes'))
app.use('/auth', require('./routes/auth.routes'))

app.get('/', (req, res) => {
    res.send('<h1>Welcome!</h1>');
})

app.listen(process.env.PORT || 4400, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`)
})