import { save, findAll, findById, update, destroy, deleteAll } from "../repository/writer.repository.mjs";
import { body, check, validationResult } from "express-validator";
import bcrypt from "bcrypt";

/**
 * Create Writer Function
 * @param req 
 * @param res 
 * @returns 
 */
export async function createWriter(req, res) {
    await body('userName', 'User Name IS Required OR Cannot Be Empty/NULL').notEmpty().run(req);
    await body('address', 'Minimal Length 8').isLength({ min: 8 }).run(req);
    await body('age').isNumeric().run(req);
    await body('password')
        .matches(/[A-Z]/)
        .withMessage("Password Should Have at Least One Uppercase")
        .isLength({ min: 8 })
        .withMessage("your password should have min length 8")
        .matches(/\d/)
        .withMessage("your password should have at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage("your password should have at least one sepcial character").run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = [];
        errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg })); 
        return res.status(422).json({
        errors: extractedErrors,
        });
    }

    const writer = {
        userName: req.body.userName,
        address: req.body.address,
        age: req.body.age,
        password: await bcrypt.hash(req.body.password, 10)
    };

    const resultCreate = await save(writer, res);
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
export async function findAllWriter(req, res) {
    try
    {
        const resultWriter = await findAll();

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
export async function findWriterById(req, res) {
    const id = req.params.id
    try
    {
        const resultWriter = await findById(id);
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
export async function updateWriter(req, res) {
    const id = req.params.id;
    try
    {
        const resultUpdate = await update(req.body, id);
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
export async function deleteWriter(req, res) {
    const id = req.params.id;
    try
    {
        const resultDelete = await destroy(id);
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
export async function deleteAllWriter(req, res){
    try
    {
        const resultDelete = await deleteAll();
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

  

