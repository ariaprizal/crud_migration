const db = require("./../../models");
const Writer = db.Writer;
const Op = db.Sequelize.Op;
const writerRepo = require("./../repository/writer.repository");

/**
 * Create Writer Function
 * @param req 
 * @param res 
 * @returns 
 */
exports.createWriter = async (req, res) =>
{
    // Create a Tutorial
    const writer = {
        userName: req.body.userName,
        address: req.body.address,
        age: req.body.age,
    };

    const resultCreate = await writerRepo.save(writer, res);
    if (resultCreate.success === true)
    {
        res.json({
            "status": 200,
            "message": `SUCCESFULLY CREATE WRITER FOR THIS USER NAME ${writer.userName}`,
            "data": writer
        }); 
    }
    else
    {
        res.json({
            "status": 400,
            "message": `FAILED TO CREATE WRITER FOR THIS USER NAME ${writer.userName} BECAUSE ${resultCreate.message}`,
            "data": writer
        });  
    }
}

/**
 * Function Find All Writer
 * @param req 
 * @param res 
 */
exports.findAllWriter = async (req, res) => {
    try
    {
        const resultWriter = await writerRepo.findAll();

        if (resultWriter.length !== 0 )
        {
            res.json({
                "status": 200,
                "message": `SUCCESFULLY GET ALL DATA`,
                "data": resultWriter
            }); 
        }
        else
        {
            res.json({
                "status": 404,
                "message": `FAILED TO GET ALL DATA BECAUSE WRITER DATA IS EMPTY`,
                "data": null
            });  
        }
        
    }
    catch (error)
    {
        res.json({
            "status": 400,
            "message": `FAILED TO GET ALL DATA BECAUSE ${error.message}`,
            "data": null
        });
    }
}

/**
 * Function Find Writer By Id
 * @param req 
 * @param res 
 */
exports.findById = async (req, res) => {
    const id = req.params.id
    try
    {
        const resultWriter = await writerRepo.findById(id);
        if (resultWriter !== null)
        {
            res.json({
                "status": 200,
                "message": `SUCCESFULLY GET DATA FOR THIS ID ${id}`,
                "data": resultWriter
            }); 
        }
        else
        {
            res.json({
                "status": 404,
                "message": `FAILED TO GET DATA FOR THIS ID ${id} BECAUSE DATA NOT FOUND`,
                "data": null
            });  
        }
    }
    catch (error)
    {
        res.json({
            "status": 400,
            "message": `FAILED TO GET DATA FOR THIS ID ${id} BECAUSE ${error.message}`,
            "data": null
        }); 
    }
}

/**
 * Function Update Writer By Id
 * @param req 
 * @param res 
 */
exports.updateWriter = async (req, res) => {
    const id = req.params.id;
    try
    {
        const resultUpdate = await writerRepo.update(req.body, id);
        if (resultUpdate.success === true)
        {
            res.json({
                "status": 200,
                "message": `SUCCESFULLY UPDATE DATA THIS ID ${id}`,
                "data": req.body
            }); 
        }
        else
        {
            res.json({
                "status": 400,
                "message": `FAILED TO UPDATE DATA THIS ID ${id}`,
                "data": req.body
            });  
        }
    }
    catch (error)
    {
        res.json({
            "status": 400,
            "message": `FAILED TO UPDATE DATA THIS ID ${id} BECAUSE ${error.message}`,
            "data": req.body
        }); 
    }
}

/**
 * Function Delete Writer By Id
 * @param req 
 * @param res 
 */
exports.deleteWriter = async (req, res) => {
    const id = req.params.id;
    try
    {
        const resultDelete = await writerRepo.delete(id);
        if (resultDelete !== 0)
        {
            res.json({
                "status": 200,
                "message": `SUCCESFULLY DELETE DATA THIS ID ${id}`,
                "data": null
            }); 
        }
        else
        {
            res.json({
                "status": 400,
                "message": `FAILED DELETE DATA THIS ID ${id}`,
                "data": null
            }); 
        }
    }
    catch (error)
    {
        res.json({
            "status": 400,
            "message": `FAILED DELETE DATA THIS ID ${id} BECAUSE ${error.message}`,
            "data": null
        }); 
    }
}

/**
 * Function Delete All Writer
 * @param req 
 * @param res 
 */
exports.deleteAllWriter = async (req, res) =>
{
    try
    {
        const resultDelete = await writerRepo.deleteAll();
        if (resultDelete !== 0)
        {
            res.json({
                "status": 200,
                "message": `SUCCESFULLY DELETE ALL DATA`,
                "data":  null
            });   
        }
        else
        {
            res.json({
                "status": 400,
                "message": `FAILED DELETE ALL DATA WRITTER`,
                "data" : null
            }); 
        }
    }
    catch (error)
    {
        res.json({
            "status": 400,
            "message": `FAILED DELETE ALL DATA WRITTER BECAUSE ${error.message}`,
            "data": null
        }); 
    }
}

