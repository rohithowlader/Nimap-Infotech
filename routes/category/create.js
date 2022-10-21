import express from "express";
import category from "../../models/category.js";
import { v4 as uuidv4 } from 'uuid';

let createCategory = express.Router();

createCategory.post('/v1.0/categories/', async (req, res) => {

    try {
        let { categoryName } = req.body;

        const categoryFind = await category.findOne({ categoryName: categoryName });
        

//NimapInfotech
        if(categoryFind)
        {
            return res.status(409).json({ message: `Category ${categoryName} Already Present` });
        }
        if (!categoryFind) {

            
            let uuidGenerate = uuidv4();
            const categories = new category({
                categoryName,
                uuidCategory: uuidGenerate,
                date: Date.now()
            })
            const response = await categories.save();
            return res.status(200).json({
                messsage: `Category ${categories.categoryName} Created`
            });
        }
        

    }
    catch (e) {
        console.log(e);
    }
});

export default createCategory;