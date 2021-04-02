import express from "express";
import adminGetRideListController from "../controllers/admin/adminGetRideListController";

const router = express.Router();

router.get("/rides", adminGetRideListController);

export default router;
