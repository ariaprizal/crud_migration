import { body, validationResult } from "express-validator";
import { save, findAll, findById, update, destroy, deleteAll, findAllByCategory } from "../repository/article.repository.mjs";

/**
 * Function Create Article
 * @param req 
 * @param res 
 */
export async function createArticle(req, res) {

    await body('writerId', 'WRITER IS REQUIRED OR CANNOT BE EMPTY/NULL').exists().notEmpty().run(req);
    await body('title', 'MINIMAL LENGTH 8').exists().isLength({ min: 8 }).run(req);
    await body('category').exists().isString().notEmpty().run(req);
    await body('body_text').exists().notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = [];
        errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
        return res.status(422).json({
        errors: extractedErrors,
        });
    }

    let article = {
        title: req.body.title,
        body_text: req.body.body_text,
        writerId: req.body.writerId,
        category: req.body.category
    }

    try {
        const resultCreate = await save(article);

        if (resultCreate.success === true)
        {
            res.json({
                "status": 200,
                "message": `SUCCESSFULLY CREATE ARTICLE FOR THIS TITLE ${article.title}`,
                "data": article
            }); 
        }
        else
        {
            res.json({
                "status": 400,
                "message": `FAILED TO CREATE ARTICLE FOR THIS TITLE ${article.title} BECAUSE ${resultCreate.message}`,
                "data": article
            });  
        }
    }
    catch (error) {
        res.json({
            "status": 400,
            "message": `FAILED TO CREATE ARTICLE FOR THIS TITLE ${article.title} BECAUSE  ${error.message}`,
            "data": null
        }); 
    }
}

/**
 * Function Find All Article
 * @param req 
 * @param res 
 */
export async function findAllArticle(req, res) {
    try
    {
        const resultArticles = await findAll();
        if (resultArticles.length !== 0)
        {
            res.json({
                "status": 200,
                "message": `SUCCESSFULLY GET ALL ARTICLE `,
                "data": resultArticles
            }); 
        }
        else
        {
            res.json({
                "status": 404,
                "message": `FAILED TO GET ALL ARTICLE BECAUSE ARTICLE IS EMPTY`,
                "data": null
            });  
        }
    }
    catch (error)
    {
        res.json({
            "status": 400,
            "message": `FAILED TO GET ALL ARTICLE BECAUSE ${error.message}`,
            "data": null
        }); 
    }
}

/**
 * Function Find Article By Id
 * @param req 
 * @param res 
 */
export async function findArticleById(req, res) {
    const id = req.params.id;
    try
    {
        const resultArticle = await findById(id);
        if (resultArticle !== null)
        {
            res.json({
                "status": 200,
                "message": `SUCCESSFULLY GET ARTICLE FOR THIS ID ${id} `,
                "data": resultArticle
            }); 
        }
        else
        {
            res.json({
                "status": 404,
                "message": `FAILED TO GET ARTICLE FOR THIS ID ${id} BECAUSE ARTICLE NOT FOUND`,
                "data": null
            });  
        }
    }
    catch (error)
    {
        res.json({
            "status": 400,
            "message": `FAILED TO GET ARTICLE FOR THIS ID ${id} BECAUSE ${error.message}`,
            "data": null
        });  
    }
}

/**
 * Function Update Article By Id
 * @param req 
 * @param res 
 */
export async function updateArticle(req, res) {
    const id = req.params.id;
    try {
        const resultUpdate = await update(req.body, id);
        if (resultUpdate.success !== false)
        {
            res.json({
                "status": 200,
                "message": `SUCCESSFULLY UPDATE ARTICLE FOR THIS ID ${id} `,
                "data": req.body
            }); 
        }
        else
        {
            res.json({
                "status": 400,
                "message": `FAILED TO UPDATE ARTICLE FOR THIS ID ${id} BECAUSE ${resultUpdate.message}`,
                "data": null
            });  
        }
    }
    catch (error) {
        res.json({
                "status": 400,
                "message": `FAILED TO UPDATE ARTICLE FOR THIS ID ${id} BECAUSE ${error.message}`,
                "data": null
            });
    }
}

/**
 * Function Delete Article By Id
 * @param req 
 * @param res 
 */
export async function deleteArticleById(req, res) {
    const id = req.params.id;
    try {
        const resultDelete = await destroy(id);
        if (resultDelete !== 0)
        {
            res.json({
                "status": 200,
                "message": `SUCCESSFULLY DELETE ARTICLE FOR THIS ID ${id} `,
                "data": req.body
            }); 
        }
        else
        {
            res.json({
                "status": 400,
                "message": `FAILED TO DELETE ARTICLE FOR THIS ID ${id}`,
                "data": null
            });  
        }
    }
    catch (error) {
        res.json({
            "status": 400,
            "message": `FAILED TO DELETE ARTICLE FOR THIS ID ${id} BECAUSE ${error.message}`,
            "data": null
        }); 
    }
}

/**
 * Function Delete All Article
 * @param req 
 * @param res 
 */
export async function deleteAllArticle(req, res) {
    try {
        const resultDelete = await deleteAll();
        if (resultDelete !== 0)
        {
            res.json({
                "status": 200,
                "message": `SUCCESSFULLY DELETE ALL ARTICLE`,
                "data": req.body
            }); 
        }
        else
        {
            res.json({
                "status": 400,
                "message": `FAILED TO DELETE ALL ARTICLE`,
                "data": null
            });  
        }
    }
    catch (error) {
        res.json({
            "status": 400,
            "message": `FAILED TO DELETE ALL ARTICLE BECAUSE ${error.message}`,
            "data": null
        }); 
    }
}


/**
 * Function Find All Article By Category
 * @param req 
 * @param res 
 */
 export async function findAllArticleByCategory(req, res) {
    const reqBody = req.body.category;
    const category = reqBody.toUpperCase();
    await body('category', 'CATEGORY IS REQUIRED OR CANNOT BE EMPTY/NULL').exists().notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = [];
        errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
        return res.status(422).json({
        errors: extractedErrors,
        });
    }
    try {
        const resultWriter = await findAllByCategory(reqBody);
        if (resultWriter.length !== 0) {
            res.json({
                "status": 200,
                "message": `SUCCESFULLY GET ALL DATA WITH CATEGORY ${category}`,
                "data": resultWriter
            });
        }
        else {
            res.json({
                "status": 404,
                "message": `FAILED TO GET ALL DATA WITH CATEGORY ${category} BECAUSE WRITER DATA IS EMPTY`,
                "data": null
            });
        }
    }
    catch (error) {
        res.json({
            "status": 404,
            "message": `FAILED TO GET ALL DATA WITH CATEGORY ${category} BECAUSE ${error.message}`,
            "data": null
        });
    }

}