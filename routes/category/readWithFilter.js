import express from 'express';
import category from "../../models/category.js";

let readWithFilterCategory = express.Router();

readWithFilterCategory.post('/v1.0/categories/filter', async (req, res) => {

    try {
        const pageNumber = parseInt(req.query.pageNumber) || 0;
        const limit = parseInt(req.query.limit) || 12;
        const result = {};
        const totalPosts = await category.countDocuments().exec();
        let startIndex = pageNumber * limit;
        const endIndex = (pageNumber + 1) * limit;
        result.totalCategory = totalPosts;
        if (startIndex > 0) {
            result.previous = {
                pageNumber: pageNumber - 1,
                limit: limit,
            };
        }
        if (endIndex < (await category.countDocuments().exec())) {
            result.next = {
                pageNumber: pageNumber + 1,
                limit: limit,
            };
        }
        result.data = await category.find()
            .sort("categoryName")
            .skip(startIndex)
            .limit(limit)
            .exec();
        result.rowsPerPage = limit;
        return res.json({ msg: "Posts Fetched successfully", data: result });
    }


    catch (e) {
        console.log(e);
    }
});

export default readWithFilterCategory;

