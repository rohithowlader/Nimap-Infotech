import express from "express";
import category from "../../models/category.js";

let updateCategory = express.Router();

updateCategory.post('/', async (req, res) => {

    try {

        let { uuidCategory,categoryName,newCategoryName } = req.body;
        if(!newCategoryName)
        {
            return res.status(404).json({message:"Invalid entry"})
        }

        const categoryFind = await category.findOne({categoryName: newCategoryName  } );

        if(categoryFind)
        {
            return res.status(404).json({message:"New Entered Changes already Present as Entry"})
        }
        const newCategoryFind = await category.findOne({$or: [{ uuidCategory: uuidCategory},{categoryName: categoryName } ]});

        if(!newCategoryFind)
        {
            return res.status(404).json({message:"Invalid entry"})
        }
        
        const filter = {$or: [{ uuidCategory: uuidCategory},{categoryName: categoryName } ]};
        const update = {
            categoryName:newCategoryName
        };

        let doc = await category.findOneAndUpdate(filter, update);
        return res.status(200).json({
            messsage: `Updated entry. Changed ${newCategoryFind.categoryName} to ${newCategoryName}`,

        });

    }
    catch (e) {
        console.log(e);
    }
});

export default updateCategory;