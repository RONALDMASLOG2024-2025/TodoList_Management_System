const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()


const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/hello', (req, res) => {
    res.json({message: 'Welcome Ronald Maslog... Your Todo Task Today!'})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

