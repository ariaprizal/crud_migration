const db = require("./../../models");
const Writer = db.Writer;

/**
 * Create New Writer
 * @param {*} writer 
 * @param {*} res 
 */
exports.save = async writer =>
{
    let result = {
        "success": false,
        "message": null,
    };

    try
    {
        await Writer.create(writer);
        result.success = true;
    }
    catch (error)
    {
        result.message = error.message;
    }
    return result;
};

/**
 * Find All Writter
 */
exports.findAll = async () => {
    return  await Writer.findAll({
        include : ["list_article"]
    });
};

/**
 * Find By Id
 * @param {*} id 
 */
exports.findById = async id => {
    return await Writer.findByPk(id, {
        include: ["list_article"]
    });
};

/**
 * Update Writter
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
        const updateWriter = await Writer.update(data, {
            where : {id: id}
        });
        updateWriter[0] !== 0 ? result.success = true : result.success = false;
    }
    catch (error)
    {
        result.message = error.message;
    }
    return result;
};

/**
 * Delete Writter
 * @param {*} id 
 */
exports.delete = async id => {
    return await Writer.destroy({
        where: { id: id }
    });
};

/**
 * Delete All Data Writter
 */
exports.deleteAll = async () => {
    return await Writer.destroy({
        where: {},
        truncate: false
    });
};

exports.findWritterByCategory = async category => {
    
};