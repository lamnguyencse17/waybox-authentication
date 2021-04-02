import express from "express";
import adminRouter from "./admin";
import registerController from "../controllers/authenticate/registerController";
import loginController from "../controllers/authenticate/loginController";

const router = express.Router();

router.post("/register", registerController);
router.post("/authenticate", loginController);
// router.post("/authenticate2", otpController);
// router.post("/refresh", refreshTokenController);
// router.post("/verify", verifyTokenController);

router.use("/admin", adminRouter);

export default router;
