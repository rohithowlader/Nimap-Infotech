import express from 'express';
import category from "../../models/category.js";

let readCategory = express.Router();

readCategory.get('/v1.0/categories', async (req, res) => {

    try {

        const categoryFind = await category.find({});
        const totalCategory = await category.countDocuments().exec();
        if(!categoryFind)
        {
            return res.status(404).json({message:"Invalid entry"})
        }
        
        return res.status(200).json({
            messsage: `categories are`,
            categoryFind,
            totalCategory

        });
    }


    catch (e) {
        console.log(e);
    }
});

export default readCategory;

