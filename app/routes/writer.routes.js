module.exports = app => {
    const writer = require("./../controller/writer.controller")
    let router = require('express').Router();

    /**
     * Router Create Writer
     * @api POST /api/writers/ 
     */
    router.post('/', writer.createWriter);

    /**
     * Router Find All Writers
     * @api GET /api/writers/ 
     */
    router.get('/', writer.findAllWriter);

    /**
     * Router Find Writers By Id
     * @api GET /api/writers/:id
     */
    router.get('/:id', writer.findById);

    /**
     * Router Update Writers By Id
     * @api PUT /api/writers/:id
     */
    router.put('/:id', writer.updateWriter);

    /**
     * Router Delete Writers By Id
     * @api DELETE /api/writers/:id
     */
    router.delete('/:id', writer.deleteWriter);

    /**
     * Router Delete All Writers
     * @api DELETE /api/writers/ 
     */
    router.delete('/', writer.deleteAllWriter);
    
    /**
     * Router Find All Writers By Categories
     * @api GET /api/writers/:category
     */
    router.get('/category/:category', writer.findWriterByCategory);
    
    // Route Group
    app.use('/api/writers', router);
}