import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is Required"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password should be six characters"),
];
export const signupvalidator = [
    body("name").notEmpty().withMessage("Name is Required"),
    ...loginValidator,
];
export const chatcompeletionvalidator = [
    body("message").notEmpty().withMessage(" iMessages Required"),
];
//# sourceMappingURL=validators.js.map