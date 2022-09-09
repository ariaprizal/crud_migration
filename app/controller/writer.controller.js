const db = require("./../../models");
const Writer = db.Writer;
const Op = db.Sequelize.Op;

/**
 * Create Writer Function
 * @param req 
 * @param res 
 * @returns 
 */
exports.createWriter = async (req, res) =>
{
    // Validate request
    if (!req.body.userName) {
        res.status(400).send({
          message: "Content can not be empty! "
        });
        return;
    }
    // Create a Tutorial
    const writer = {
        userName: req.body.userName,
        address: req.body.address,
        age: req.body.age,
    };

    // Save Tutorial in the database
    try {
        const saveWriter = await Writer.create(writer);
        res.json({
            "status": 200,
            "message": "Success Create Writer",
            "data": saveWriter
        });
    }
    catch (error)
    {
        res.json({
            "message": error.message,
            "data": null
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
        const resultWriter = await Writer.findAll({
            include : ["list_article"]
        });
        if (resultWriter.length !== 0)
        {
            res.json({
                "status": 200,
                "message": "Success Get All Writer",
                "data": resultWriter
            });   
        }
        else
        {
            res.json({
                "status": 404,
                "message": "Failed Get All Writer Because Writer Is empty",
                "data": resultWriter
            });  
        }
    }
    catch (error)
    {
        res.json({
            "message": error.message,
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
    try
    {
        const id = req.params.id
        const resultWriter = await Writer.findByPk(id, {
            include : ["list_article"]
        });
        if (resultWriter !== null)
        {
            res.json({
                "status": 200,
                "message": `Success Get Writer For This Id ${id}`,
                "data": resultWriter
            });   
        }
        else
        {
            res.json({
                "status": 404,
                "message": `Failed Get Writer Because This ID ${id} Not Found`,
                "data": resultWriter
            });  
        }
    }
    catch (error)
    {
        res.json({
            "message": error.message,
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
    try
    {
        const id = req.params.id;
        const resultUpdate = await Writer.update(req.body, {
            where: {id : id}
        })
        if (resultUpdate[0] !== 0)
        {
            res.json({
                "status": 200,
                "message": `Successfully Update Writer For This Id ${id}`,
                "data": req.body
            });  
        }
        else
        {
            res.json({
                "status": 400,
                "message": `Failed Update Writer For This Id ${id}`,
                "data": req.body
            }); 
        }
    }
    catch (error)
    {
        res.json({
            "message": error.message,
            "data": null
        });
    }
}

/**
 * Function Delete Writer By Id
 * @param req 
 * @param res 
 */
exports.deleteWriter = async (req, res) => {
    try
    {
        const id = req.params.id;
        const resultDelete = await Writer.destroy({
            where: {id : id}
        })
        if (resultDelete !== 0)
        {
            res.json({
                "status": 200,
                "message": `Successfully Delete Writer For This Id ${id}`
            });  
        }
        else
        {
            res.json({
                "status": 400,
                "message": `Failed Delete Writer For This Id ${id}`
            }); 
        }
    }
    catch (error)
    {
        res.json({
            "message": error.message,
            "data": null
        });
    }
}

/**
 * Function Delete All Writer
 * @param req 
 * @param res 
 */
exports.deleteAllWriter = async (req, res) => {
    try
    {
        const resultDelete = await Writer.destroy({
            where: {},
            truncate: false
        })
        if (resultDelete !== 0)
        {
            res.json({
                "status": 200,
                "message": `Successfully Delete All Writer Data`
            });  
        }
        else
        {
            res.json({
                "status": 400,
                "message": `Failed Delete All Writer Data`
            }); 
        }
    }
    catch (error)
    {
        res.json({
            "message": error.message,
            "data": null
        });
    }
}

/**
 * Function Find All Writer By Category
 * @param req 
 * @param res 
 */
exports.findWriterByCategory = async (req, res) => {
    try
    {
        const category = req.params.category;
        const resultWriter = await Writer.findAll({
            where: { category: category },
            include : ["list_article"]
        });
        if (resultWriter.length !== 0)
        {
            res.json({
                "status": 200,
                "message": `Successfully Find Writer By category ${category}`,
                "data": resultWriter
            });
        }
        else
        {
            res.json({
                "status": 404,
                "message": `Failed Find Writer By categories ${category}`,
                "data": null
            }); 
        }
    }
    catch (error)
    {
        res.json({
            "message": error.message,
            "data": null
        });
    }

}