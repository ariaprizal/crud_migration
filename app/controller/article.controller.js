const db = require("./../../models");
const Article = db.Article;

/**
 * Function Create Article
 * @param req 
 * @param res 
 */
exports.createArticle = async (req, res) => {
    try {
        let article = {
            title: req.body.title,
            body_text: req.body.body_text,
            writerId: req.body.writerId
        }
        const createArticle = await Article.create(article);

        res.json({
            "status": 200,
            "message": "Success Create Article",
            "data": createArticle
        });
    }
    catch (error) {
        res.json({
            "message": "Failed Create Article",
            "data": error.message || "Something Errors"
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
        const resultArticles = await Article.findAll();
        if (resultArticles.length !== 0)
        {
            res.json({
                "status": 200,
                "message": "Success Get All Article",
                "data": resultArticles
            });   
        }
        else
        {
            res.json({
                "status": 404,
                "message": "Failed Get All Article Because Article Is empty",
                "data": resultArticles
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
};

/**
 * Function Find Article By Id
 * @param req 
 * @param res 
 */
exports.findById = async (req, res) => {
    try
    {
        const id = req.params.id;
        const resultArticle = await Article.findByPk(id);
        if (resultArticle !== null)
        {
            res.json({
                "status": 200,
                "message": `Success Get Article For This Id ${id}`,
                "data": resultArticle
            });   
        }
        else
        {
            res.json({
                "status": 404,
                "message": `Failed Get Article Because This ID ${id} Not Found`,
                "data": resultArticle
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
};

/**
 * Function Update Article By Id
 * @param req 
 * @param res 
 */
exports.updateArticle = async (req, res) => {
    try {
        const id = req.params.id;
        const resultUpdate = await Article.update(req.body, {
            where: { id: id }
        })
        if (resultUpdate[0] !== 0) {
            res.json({
                "status": 200,
                "message": `Successfully Update Article For This Id ${id}`,
                "data": req.body
            });
        }
        else {
            res.json({
                "status": 400,
                "message": `Failed Update Article For This Id ${id}`,
                "data": null
            });
        }
    }
    catch (error) {
        res.json({
            "message": error.message,
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
    try {
        const id = req.params.id;
        const resultDelete = await Article.destroy({
            where: { id: id }
        })
        if (resultDelete !== 0) {
            res.json({
                "status": 200,
                "message": `Successfully Delete Article For This Id ${id}`
            });
        }
        else {
            res.json({
                "status": 400,
                "message": `Failed Delete Article For This Id ${id}`
            });
        }
    }
    catch (error) {
        res.json({
            "message": error.message,
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
        const resultDelete = await Article.destroy({
            where: {},
            truncate: false
        })
        if (resultDelete !== 0) {
            res.json({
                "status": 200,
                "message": `Successfully Delete All Article Data`
            });
        }
        else {
            res.json({
                "status": 400,
                "message": `Failed Delete All Article Data`
            });
        }
    }
    catch (error) {
        res.json({
            "message": error.message,
            "data": null
        });
    }
};