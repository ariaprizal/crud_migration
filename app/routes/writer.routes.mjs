import { Router } from "express";
import { createWriter, findAllWriter, findWriterById, deleteWriter, deleteAllWriter, updateWriter } from "../controller/writer.controller.mjs";
let routeWriter = Router();

    /**
     * Router Create Writer
     * @api POST /api/writers/ 
     */
    routeWriter.post('/', createWriter);

    /**
     * Router Find All Writers
     * @api GET /api/writers/ 
     */
    routeWriter.get('/', findAllWriter);

    /**
     * Router Find Writers By Id
     * @api GET /api/writers/:id
     */
    routeWriter.get('/:id', findWriterById);

    /**
     * Router Update Writers By Id
     * @api PUT /api/writers/:id
     */
    routeWriter.put('/:id', updateWriter);

    /**
     * Router Delete Writers By Id
     * @api DELETE /api/writers/:id
     */
    routeWriter.delete('/:id', deleteWriter);

    /**
     * Router Delete All Writers
     * @api DELETE /api/writers/ 
     */
    routeWriter.delete('/', deleteAllWriter);

export { routeWriter };