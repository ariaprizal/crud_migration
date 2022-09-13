import {db} from '../../models/index.mjs';
const  Writer  = db.Writer;

/**
 * Create New Writer
 * @param {*} writer 
 * @param {*} res 
 */
export async function save(writer)
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
}

/**
 * Find All Writter
 */
export async function findAll() {
    return  await Writer.findAll({
        include : ["list_article"]
    });
}

/**
 * Find By Id
 * @param {*} id 
 */
export async function findById(id) {
    return await Writer.findByPk(id, {
        include: ["list_article"]
    });
}

/**
 * Update Writter
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
}

/**
 * Delete Writter
 * @param {*} id 
 */
export async function destroy(id) {
    return await Writer.destroy({
        where: { id: id }
    });
}

/**
 * Delete All Data Writter
 */
export async function deleteAll() {
    return await Writer.destroy({
        where: {},
        truncate: false
    });
}

export async function findWritterByCategory(category) {
    
}