import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//mongodb+srv://riyadhahmed324_db_user:Fa9fQTIZ52RydwgJ@cluster0.r1pjqjx.mongodb.net/?appName=Cluster0

//jwt authenication logic??