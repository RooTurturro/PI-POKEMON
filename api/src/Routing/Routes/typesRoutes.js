const { Router } = require("express");
const axios = require("axios");
const { getApiTypes } = require("../Utils/typesUtils");

const typesRouter = Router();

typesRouter.get("/", async (req, res)=>{
    try {
        const types = await getApiTypes();
        res.status(200).send(types);
    } catch (error) {
        res.status(400).send(error.message);
    }
    
})
module.exports = typesRouter;