import express from "express";
import category from "../../models/category.js";

let deleteCategory = express.Router();

deleteCategory.delete('/v1.0/categories', async (req, res) => {

    try {
        let {categoryName}=req.query;
        console.log(req.query);
        let { uuidCategory}  = req.body;
       

        const categoryFind = await category.findOne({$or: [{ uuidCategory: uuidCategory},{categoryName: categoryName } ]});

        if(!categoryFind)
        {
            return res.status(404).json({message:"Invalid entry"})
        }
        
        const deleteEntry= await category.findOneAndDelete({$or: [{ uuidCategory: uuidCategory},{categoryName: categoryName } ]})
        
        return res.status(200).json({
            messsage: `Entry Deleted`
        });
                   

    }
    catch (e) {
        console.log(e);
    }
});

export default deleteCategory;