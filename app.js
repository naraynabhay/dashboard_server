import express from 'express';
import cors from 'cors';
import reportRouter from './routes/index.js';
import { mongoDB } from './database/index.js';

// Create a new instance of an Express application
const app = express();

// Connect to the database
mongoDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define allowed origins
// const allowedOrigins = [
//      'https://dashboard-client-iv6ues4bu-abhay-narayans-projects.vercel.app',
//     'http://localhost:3000'
   
// ];

// // CORS middleware
// app.use(cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
// }))
const allowedOrigins = [
    'https://dashboard-client-iv6ues4bu-abhay-narayans-projects.vercel.app',
    'http://localhost:3000'
];

// CORS middleware
app.use(cors({
    origin: function (origin, callback) {
        console.log('Origin:', origin); // Debug log
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// Route splitting
app.use("/api/data", reportRouter);
console.log(process.env.PORT);
// Variables
const PORT = process.env.PORT || 8000;

// Test route
app.get("/", (req, res) => {
    return res.send(`
        <div style="background:magenta;padding:100px;">
            <h2>Welcome to Data Virtualization Server</h2>
            <p>Below are some examples of supported routes...</p>
            <div>
                <ul>
                    <li>GET all data from the database - /api/data</li>
                    <li>GET data filtered by year - /api/data/year/:year</li>
                    <li>GET data filtered by region - /api/data/region/:region</li>
                    <li>Much more...</li>
                </ul>
            </div>
        </div>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is active on Port ${PORT}`);
});
