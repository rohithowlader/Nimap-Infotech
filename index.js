import 'dotenv/config';
import express from "express";
import connectUserDB from "./config/Db.js"
import createCategory from './routes/category/create.js';
import readCategory from './routes/category/read.js';
import deleteCategory from './routes/category/delete.js';
import updateCategory from './routes/category/update.js';

//Encoding
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

connectUserDB();

//Routing
app.use('/createCategory', createCategory);
app.use('/readCategory', readCategory);
app.use('/deleteCategory', deleteCategory);
app.use('/updateCategory', updateCategory);


//Created an express server
const PORT= process.env.DEV_PORT || process.env.PROD_PORT ;
app.get('/', (req, res) => {
    res.send(`Running on port ${process.env.PROD_PORT}` );
 });

 app.listen( PORT , () =>{
    console.log(`App is running on port : ${process.env.PROD_PORT}`);
})