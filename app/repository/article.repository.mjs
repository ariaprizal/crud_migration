import {db} from '../../models/index.mjs';

const  Article  = db.Article;

/**
 * Create New Article
 * @param {*} article 
 * @param {*} res 
 */
export async function save(article)
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
}

/**
 * Find All Article
 */
export async function findAll() {
    return  await Article.findAll();
}

/**
 * Find Article By Id
 * @param {*} id 
 */
export async function findById(id) {
    return await Article.findByPk(id);
}

/**
 * Update Article
 * @param {*} data 
 * @param {*} id 
 */
export async function update(data, id) {
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
}

/**
 * Delete Article
 * @param {*} id 
 */
export async function destroy(id) {
    return await Article.destroy({
        where: { id: id }
    });
}

/**
 * Delete All Data article
 */
export async function deleteAll() {
    return await Article.destroy({
        where: {},
        truncate: false
    });
}

/**
 * Delete All Data article
 */
export async function findAllByCategory(category) {
    return await Article.findAll({
        where: { category: category }
    });
}