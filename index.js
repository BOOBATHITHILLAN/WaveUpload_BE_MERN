require('dotenv').config();

const express=require('express');
const app=express();

//Middlewares
const cors=require('cors');
app.use(cors());
app.use(express.json());

//Router connect
const userRouter=require('./route/userRoutes');
app.use(userRouter);

const {readdirSync}=require('fs');
const path=require('path'); 
readdirSync('./videoRoutes').map((route)=>app.use('/api',require('./videoRoutes/' + route)))

app.use('/public',express.static(path.join(__dirname,'public')))

//MongoDB Connect
const mongoose=require('mongoose');
mongoose.connect(process.env.URL)
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch(err => {
        console.error(err);
    })

//Connect Server
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server connected to PORT ${PORT}`);
})


