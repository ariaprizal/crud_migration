import { Router } from "express";
import { createArticle, findAllArticle, findArticleById, deleteArticleById, deleteAllArticle, updateArticle, findAllArticleByCategory } from "../controller/article.controller.mjs";
let routeArticle = Router();

    /**
     * Router Create Article
     * @api POST /api/article/ 
     */
    routeArticle.post("/", createArticle);
    
    /**
     * Router Find All Article
     * @api GET /api/article/ 
     */
    routeArticle.get("/", findAllArticle);

    /**
     * Router Find Article By Id
     * @api GET /api/article/ 
     */
    routeArticle.get("/:id", findArticleById);

    /**
     * Router Update Article By Id
     * @api PUT /api/article/ 
     */
    routeArticle.put("/:id", updateArticle);

    /**
     * Router Delete Article By Id
     * @api DELETE /api/article/ 
     */
    routeArticle.delete("/:id", deleteArticleById);

    /**
     * Router Delete All Article
     * @api DELETE /api/article/ 
     */
    routeArticle.delete("/", deleteAllArticle);

    /**
     * Router Find All Article By Categories
     * @api POST /api/article/category
     */
    routeArticle.post('/category', findAllArticleByCategory);

    export {routeArticle}