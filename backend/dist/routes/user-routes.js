import { Router } from "express";
import { getAllUsers, userlogin, UserSignup, VerifyUser } from "../controllers/user-controller.js";
import { loginValidator, signupvalidator, validate } from "../utils/validators.js";
import { verifytoken } from "../utils/token-manager.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupvalidator), UserSignup);
userRoutes.post("/login", validate(loginValidator), userlogin);
userRoutes.get("/auth-status", verifytoken, VerifyUser);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map