import express from 'express';
import category from "../../models/category.js";

let readCategory = express.Router();

readCategory.post('/', async (req, res) => {

    try {

        const categoryFind = await category.find({});
        
        if(!categoryFind)
        {
            return res.status(404).json({message:"Invalid entry"})
        }
        
        return res.status(200).json({
            messsage: `categories are`,
            categoryFind,

        });
    }


    catch (e) {
        console.log(e);
    }
});

export default readCategory;

