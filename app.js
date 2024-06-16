import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import dotenv from 'dotenv';

// import from files
import reportRouter from './routes/index.js'
import { mongoDB } from './database/index.js'


//creates a new instance of an Express application
const app = express();

//setting up config.env file so that we can use content of it

// config({
//     path: "./config.env"
// })

dotenv.config();

//connecting server and database, just call this func^
mongoDB();


// <------------ middlewares ------------> 

//we'll be sending data in json format, that's why it is required to use this middleware
app.use(express.json());

//we'll be using dynamic routes, in order to read the data from url we have to use this
app.use(express.urlencoded({ extended: true }));

//set 'credentials: true' to pass --> headers, cookies, etc to browser/frontend
// dotenv.config();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
console.log(process.env.FRONTEND_URL);

// route splitting
app.use("/api/data", reportRouter)

// <-----------------------------------------------------------------------> 


// variables
const PORT = process.env.PORT || 8000


//it is a test route just to see our server is working
app.get("/", (req, res) => {
    return res.send(`<div style = "background:magenta;padding:100px;"><h2>Welcome to Data Virtualization Server</h2>
    <p>Below are the some examples of supported routes...</p>
        <div><ul>
            <li>GET all data from the database - /api/data</li>
            <li>GET data filtered by year - /api/data/year/:year</li>
            <li>GET data filtered by region - /api/data/region/:region</li>
            <li>Much more...</li>
        </ul></div>
    </div>`)
})


//function is used to bind and listen to the connections on the specified host and port
app.listen(PORT, (req, res) => {
    console.log(`Server is active on Port ${PORT}`)
})