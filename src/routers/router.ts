import express from "express";
import adminRouter from "./admin";
import registerController from "../controllers/authenticate/registerController";
import loginController from "../controllers/authenticate/loginController";
import verifyOtpController from "../controllers/authenticate/verifyOtpController";
import refreshController from "../controllers/authenticate/refreshController";

const router = express.Router();

router.post("/register", registerController);
router.post("/authenticate", loginController);
router.post("/authenticate2", verifyOtpController);
router.post("/refresh", refreshController);
// router.post("/verify", verifyTokenController);

router.use("/admin", adminRouter);

export default router;
