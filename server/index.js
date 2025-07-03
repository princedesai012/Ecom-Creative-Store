import express from 'express';
import dotenv from 'dotenv';
import { ConnectDB } from './src/database/db.js';
;


dotenv.config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});

// Connect to the database
ConnectDB();

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})