const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()


const app = express()
app.use(cors())
app.use(express.json())



//My Database connection USING MongoDB Atlas
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("Connected to MongoDB Atlas")).catch((err) => console.error('MongoDB connection error:', err))



app.get('/api/hello', (req, res) => {
    res.json({message: 'Welcome Ronald Maslog... Your Todo Task Today!'})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

