module.exports = app => {

    const Article = require("./../controller/article.controller");
    let router = require("express").Router();

    /**
     * Router Create Article
     * @api POST /api/article/ 
     */
    router.post("/", Article.createArticle);
    
    /**
     * Router Find All Article
     * @api GET /api/article/ 
     */
    router.get("/", Article.findAllArticle);

    /**
     * Router Find Article By Id
     * @api GET /api/article/ 
     */
    router.get("/:id", Article.findById);

    /**
     * Router Update Article By Id
     * @api PUT /api/article/ 
     */
    router.put("/:id", Article.updateArticle);

    /**
     * Router Delete Article By Id
     * @api DELETE /api/article/ 
     */
    router.delete("/:id", Article.deleteArticleById);

    /**
     * Router Delete All Article
     * @api DELETE /api/article/ 
     */
    router.delete("/", Article.deleteAllArticle);

    app.use("/api/article", router);
}