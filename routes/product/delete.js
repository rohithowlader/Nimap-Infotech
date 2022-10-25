import express from "express";
import product from "../../models/product.js";
import category from "../../models/category.js";

let deleteProduct = express.Router();

deleteProduct.delete('/v1.0/products/', async (req, res) => {

    try {
        let { productName, categoryName } = req.query;
        console.log(req.query);
        let { uuidProduct } = req.body;

        if(uuidProduct===undefined && ( productName === undefined || categoryName!== undefined))
        return res.status(400).json({ message: "Invalid entry" })

        const productFind = await product.findOne({
            $or: [
                { uuidProduct: uuidProduct },
                { $and: [{ productName: productName }, { categoryName: categoryName }] },]
        });

        if (!productFind) {
            return res.status(404).json({ message: "Invalid entry" })
        }

        const deleteEntry = await product.findOneAndDelete({
            $or: [
                { uuidProduct: uuidProduct },
                { $and: [{ productName: productName }, { categoryName: categoryName }] },]
        })

        return res.status(200).json({
            messsage: `Entry Deleted`
        });


    }
    catch (e) {
        console.log(e);
    }
});

export default deleteProduct;