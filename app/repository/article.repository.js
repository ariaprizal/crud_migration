const db = require("./../../models");
const Article = db.Article;

/**
 * Create New Article
 * @param {*} article 
 * @param {*} res 
 */
exports.save = async article =>
{
    let result = {
        "success": false,
        "message": null,
    };

    try
    {
        await Article.create(article);
        result.success = true;
    }
    catch (error)
    {
        result.message = error.message;
    }
    return result;
};

/**
 * Find All Article
 */
exports.findAll = async () => {
    return  await Article.findAll();
};

/**
 * Find Article By Id
 * @param {*} id 
 */
exports.findById = async id => {
    return await Article.findByPk(id);
};

/**
 * Update Article
 * @param {*} data 
 * @param {*} id 
 */
exports.update = async (data, id) => {
    let result = {
        "success": false,
        "message": null,
    };

    try
    {
        const updateArticle = await Article.update(data, {
            where : {id: id}
        });
        updateArticle[0] !== 0 ? result.success = true : result.success = false;
    }
    catch (error)
    {
        result.message = error.message;
    }
    return result;
};

/**
 * Delete Article
 * @param {*} id 
 */
exports.delete = async id => {
    return await Article.destroy({
        where: { id: id }
    });
}

/**
 * Delete All Data article
 */
exports.deleteAll = async () => {
    return await Article.destroy({
        where: {},
        truncate: false
    });
}