import express from "express";
import product from "../../models/product.js";
import category from "../../models/category.js";
import { v4 as uuidv4 } from 'uuid';

let createProduct = express.Router();

createProduct.post('/v1.0/products/', async (req, res) => {

    try {
        let { categoryName,  productName} = req.body;

        if(categoryName=== undefined)
        categoryName="NA";
        //finding product if present in category
        const productCategoryFind = await category.findOne({ categoryName: productName });
        const categoryCheck=await category.findOne({ categoryName: categoryName });
        const categoryFind = await product.findOne({$and: [{ productName: productName},{categoryProduct : categoryName } ]});
        


        if(productCategoryFind)
        {
            return res.status(409).json({ message: `Category as product ${productName} Already Present` });
        }
        if(categoryFind!=null)
        {
            return res.status(409).json({ message: `product ${productName} in same ${categoryName} Category Already present `});
        }
        if(!categoryCheck)
        {
            return res.status(404).json({ message: `Category Not Found` });
        }

        
        if (!categoryFind && categoryCheck) {

            
            let uuidGenerate = uuidv4();
            const products = new product({
                productName,
                uuidProduct: uuidGenerate,
                categoryProduct:categoryName,
                date: Date.now()    
            })
            const response = await products.save();
            return res.status(200).json({
                messsage: `Product ${products.productName} Created in category ${categoryName}`
            });
        }
        else
        {
            return res.status(400).json({
                messsage: `ERROR`
            });
        }
        

    }
    catch (e) {
        console.log(e);
    }
});

export default createProduct;