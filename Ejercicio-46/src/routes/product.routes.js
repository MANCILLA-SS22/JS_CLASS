import express from "express";
import {getDatosControllers, postDatosControllers, deleteDatosControllers} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", getDatosControllers);
router.post("/", postDatosControllers);
router.delete("/", deleteDatosControllers);

export default router;