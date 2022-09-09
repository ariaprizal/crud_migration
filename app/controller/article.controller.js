const db = require("./../../models");
const Article = db.Article;
const articleRepo = require("./../repository/article.repository");

/**
 * Function Create Article
 * @param req 
 * @param res 
 */
exports.createArticle = async (req, res) => {
    
    let article = {
        title: req.body.title,
        body_text: req.body.body_text,
        writerId: req.body.writerId,
        category: req.body.category
    }

    try {
        const resultCreate = await articleRepo.save(article);

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
};

/**
 * Function Find All Article
 * @param req 
 * @param res 
 */
exports.findAllArticle = async (req, res) => {
    try
    {
        const resultArticles = await articleRepo.findAll();
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
};

/**
 * Function Find Article By Id
 * @param req 
 * @param res 
 */
exports.findById = async (req, res) => {
    const id = req.params.id;
    try
    {
        const resultArticle = await articleRepo.findById(id);
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
};

/**
 * Function Update Article By Id
 * @param req 
 * @param res 
 */
exports.updateArticle = async (req, res) => {
    const id = req.params.id;
    try {
        const resultUpdate = await articleRepo.update(req.body, id);
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
};

/**
 * Function Delete Article By Id
 * @param req 
 * @param res 
 */
exports.deleteArticleById = async (req, res) => {
    const id = req.params.id;
    try {
        const resultDelete = await articleRepo.delete(id);
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
};

/**
 * Function Delete All Article
 * @param req 
 * @param res 
 */
exports.deleteAllArticle = async (req, res) => {
    try {
        const resultDelete = await articleRepo.deleteAll();
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
};


/**
 * Function Find All Article By Category
 * @param req 
 * @param res 
 */
 exports.findWriterByCategory = async (req, res) => {
    const body = req.body.category;
    const category = body.toUpperCase();
    try {
        const resultWriter = await Article.findAll({
            where: { category: category }
        });
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

};