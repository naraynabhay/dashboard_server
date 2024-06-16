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
const allowedOrigins = [
    'http://localhost:3000',
    'https://dashboard-client-iv6ues4bu-abhay-narayans-projects.vercel.app'
];

// CORS middleware
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// Route splitting
app.use("/api/data", reportRouter);

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
