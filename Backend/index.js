// const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const pickerRoute = require('./Routes/picker.route')
let app = express();
let connectToDatabase = require('./db/ConnectDatabase');
const userRoute = require('./Routes/user.route');
const AuthMiddleware = require('./Middleware/userAuth.middleware')
const notificationRouter = require('./Routes/notification.route')
const PORT = process.env.PORT || 8080
app.use(express.json());
app.use(cors());

app.use('/user' , userRoute);

app.use( AuthMiddleware );

app.use('/notification' , notificationRouter );
app.use('/picker' , pickerRoute );

connectToDatabase().then(() => {

    app.listen( PORT , () => {
        console.log("server started on 8080")
    })

}
)

 