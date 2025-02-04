require('dotenv').config();

const express = require('express');
const companyRoute = require('./routes/companyRoute');
const connectDB = require('./config/db');
const ticketRoute = require('./routes/ticketRoute');
const busRoute = require('./routes/busRoute');
const userRoute = require('./routes/userRouter'); // Changed from userRouter to userRoute

//express app
const app = express();

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/company', companyRoute);
app.use('/api/ticket', ticketRoute);
app.use('/api/buses', busRoute);  
app.use('/api/user', userRoute); 

//connect to mongodb
connectDB().then(() => {
    //listen for requests 
    app.listen(process.env.PORT, () => {
        console.log('connected to the database and listening for request on port', process.env.PORT);
    });
}).catch((error) => {
    console.log('Failed to connect to MongoDB', error);
});