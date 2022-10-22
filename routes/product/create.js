import express from "express";
import product from "../../models/product.js";
import { v4 as uuidv4 } from 'uuid';

let createProduct = express.Router();

createProduct.post('/v1.0/products/', async (req, res) => {

    try {
        let { categoryName,  productName} = req.body;

        if(categoryName=== undefined)
        categoryName="NA";
        const productFind = await product.findOne({ productName: productName });
        
        if(productFind)
        {
            return res.status(409).json({ message: `Category ${productName} Already Present` });
        }
        if (!productFind) {

            
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
        

    }
    catch (e) {
        console.log(e);
    }
});

export default createProduct;